/********************************************************************
 * FELLA'S GARDEN - CUSTOM PROPERTY & PROP STUDIO (js/prop_studio.js)
 * Studio gambar properti & dekorasi custom dengan peralatan lengkap
 * identik dan konsisten dengan Studio Hewan & Studio Bunga:
 * Pensil, Cat Air Lembut, Krayon Tekstur Kayu/Batu, Kuas Cahaya Neon,
 * Penghapus, Pipet Warna, Undo/Redo, Palet Warna + Color Picker,
 * Pilihan Nama Properti, Pilihan Habitat (Darat / Air / Keduanya),
 * dan SISTEM LOGIKA PENGATUR SKALA PROPERTI (0.3x - 3.0x) baik saat
 * mendesain di studio maupun interaktif di kebun.
 ********************************************************************/

var propPadCanvas = null;
var propPadCtx = null;
var propStudioTool = 'pencil';
var propStudioBrushType = 'pencil'; // 'pencil', 'watercolor', 'crayon', 'glow'
var propStudioCurrentColor = '#78350f'; // Warm wood / earth tone
var propStudioBrushSize = 7;
var isDrawingPropStudio = false;
var propStudioStrokes = [];
var propStudioRedoStack = [];
var selectedPropHabitat = 'land';
var selectedPropScale = 1.0;
var propZoom = 1.0;
var propPanX = 0;
var propPanY = 0;
var isPropPanMode = false;
var isPropPanning = false;
var propPanStartX = 0;
var propPanStartY = 0;

// Multi-touch 2-finger zoom & pan state
var isTwoFingerTransformingProp = false;
var propGestureInitialDist = 0;
var propGestureInitialZoom = 1.0;
var propGestureInitialMidX = 0;
var propGestureInitialMidY = 0;
var propGestureInitialPanX = 0;
var propGestureInitialPanY = 0;
var suppressPropDrawUntilAllUp = false;
var activePropTouchPointers = new Set();

// LocalStorage persistent catalog for player's custom props
const CUSTOM_PROPS_STORAGE_KEY = 'fella_custom_props_catalog_v1';

function getCustomPropsCatalog() {
    try {
        const raw = localStorage.getItem(CUSTOM_PROPS_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveCustomPropsCatalog(list) {
    try {
        localStorage.setItem(CUSTOM_PROPS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
}

// =========================================================================
// SMOOTH STROKE & TEXTURED BRUSH ENGINE (Cat Air, Krayon, Kuas Cahaya)
// =========================================================================
var propLiveStroke = null;

function hexToRgb(hex) {
    let h = String(hex || '#000000').replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    if (isNaN(n)) return { r: 0, g: 0, b: 0 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgba(c, a) {
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')';
}

function mixWithWhite(c, amt) {
    return {
        r: Math.round(c.r + (255 - c.r) * amt),
        g: Math.round(c.g + (255 - c.g) * amt),
        b: Math.round(c.b + (255 - c.b) * amt)
    };
}

function traceSmoothPath(ctx, pts) {
    ctx.beginPath();
    if (pts.length === 1) {
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[0].x + 0.01, pts[0].y);
        return;
    }
    ctx.moveTo(pts[0].x, pts[0].y);
    if (pts.length === 2) {
        ctx.lineTo(pts[1].x, pts[1].y);
        return;
    }
    for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
    }
    const last = pts[pts.length - 1];
    ctx.lineTo(last.x, last.y);
}

function relaxPoints(pts) {
    if (pts.length < 3) return pts;
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
        out.push({
            x: pts[i - 1].x * 0.25 + pts[i].x * 0.5 + pts[i + 1].x * 0.25,
            y: pts[i - 1].y * 0.25 + pts[i].y * 0.5 + pts[i + 1].y * 0.25
        });
    }
    out.push(pts[pts.length - 1]);
    return out;
}

function paintWatercolorLayer(lctx, pts, color, size) {
    const c = hexToRgb(color);
    const W = Math.max(6, size * 1.7);
    lctx.lineCap = 'round';
    lctx.lineJoin = 'round';

    const rings = 8;
    for (let i = 0; i < rings; i++) {
        const k = i / (rings - 1);
        lctx.lineWidth = W * (1.35 - k * 0.7);
        lctx.strokeStyle = rgba(c, 0.085);
        traceSmoothPath(lctx, pts);
        lctx.stroke();
    }

    lctx.lineWidth = W * 0.66;
    lctx.strokeStyle = rgba(c, 0.26);
    traceSmoothPath(lctx, pts);
    lctx.stroke();
}

function paintGlowLayer(lctx, pts, color, size) {
    const c = hexToRgb(color);
    const core = Math.max(2.5, size * 0.95);
    lctx.lineCap = 'round';
    lctx.lineJoin = 'round';

    const halo = 9;
    for (let i = 0; i < halo; i++) {
        const k = i / (halo - 1);
        lctx.lineWidth = core * (4.2 - k * 3.0);
        lctx.strokeStyle = rgba(c, 0.045);
        traceSmoothPath(lctx, pts);
        lctx.stroke();
    }

    lctx.lineWidth = core * 1.15;
    lctx.strokeStyle = rgba(c, 0.85);
    traceSmoothPath(lctx, pts);
    lctx.stroke();

    lctx.lineWidth = Math.max(1.2, core * 0.5);
    lctx.strokeStyle = rgba(mixWithWhite(c, 0.82), 0.95);
    traceSmoothPath(lctx, pts);
    lctx.stroke();
}

function paintCrayonSegment(ctx, fromPos, toPos, color, size) {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = color;
    const dist = Math.hypot(toPos.x - fromPos.x, toPos.y - fromPos.y);
    const steps = Math.max(1, Math.ceil(dist / 3));
    const rad = Math.max(2, size * 0.6);
    for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const cx = fromPos.x + (toPos.x - fromPos.x) * t;
        const cy = fromPos.y + (toPos.y - fromPos.y) * t;
        for (let i = 0; i < 6; i++) {
            const ox = (Math.random() - 0.5) * rad * 1.4;
            const oy = (Math.random() - 0.5) * rad * 1.4;
            ctx.globalAlpha = 0.4 + Math.random() * 0.5;
            ctx.fillRect(cx + ox, cy + oy, 2.1, 2.1);
        }
    }
    ctx.restore();
}

function renderPropLiveStroke() {
    const s = propLiveStroke;
    if (!s) return;
    const ctx = s.ctx;
    const lctx = s.layerCtx;
    lctx.clearRect(0, 0, s.layer.width, s.layer.height);
    const pts = relaxPoints(s.points);
    if (s.type === 'watercolor') {
        paintWatercolorLayer(lctx, pts, s.color, s.size);
    } else {
        paintGlowLayer(lctx, pts, s.color, s.size);
    }
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(s.base, 0, 0);
    ctx.drawImage(s.layer, 0, 0);
    ctx.restore();
}

function beginPropLiveStroke(ctx, pos, brushType, color, size) {
    const cv = ctx.canvas;
    const base = document.createElement('canvas');
    base.width = cv.width;
    base.height = cv.height;
    base.getContext('2d').drawImage(cv, 0, 0);
    const layer = document.createElement('canvas');
    layer.width = cv.width;
    layer.height = cv.height;
    propLiveStroke = {
        ctx: ctx,
        type: brushType,
        color: color,
        size: size,
        base: base,
        layer: layer,
        layerCtx: layer.getContext('2d'),
        points: [{ x: pos.x, y: pos.y }]
    };
    renderPropLiveStroke();
}

function extendPropLiveStroke(ctx, fromPos, toPos, brushType, color, size) {
    if (!propLiveStroke || propLiveStroke.ctx !== ctx || propLiveStroke.type !== brushType) {
        beginPropLiveStroke(ctx, fromPos, brushType, color, size);
    }
    const pts = propLiveStroke.points;
    const last = pts[pts.length - 1];
    if (Math.hypot(toPos.x - last.x, toPos.y - last.y) < 1.2) return;
    pts.push({ x: toPos.x, y: toPos.y });
    renderPropLiveStroke();
}

function endPropLiveStroke() {
    propLiveStroke = null;
}

// =========================================================================
// CANVAS TRANSFORM & VIEWPORT CONTROLS
// =========================================================================

function applyPropTransform(immediate = false) {
    const paper = document.getElementById('propCanvasPaper');
    if (paper) {
        paper.style.transformOrigin = 'center center';
        paper.style.transition = immediate ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)';
        paper.style.transform = `translate3d(${propPanX}px, ${propPanY}px, 0) scale(${propZoom})`;
    }
    if (propPadCanvas) {
        propPadCanvas.style.transform = 'none';
    }
    const txt = document.getElementById('propZoomLevelText');
    if (txt) txt.textContent = `${Math.round(propZoom * 100)}%`;
}

function zoomPropCanvas(delta) {
    const next = Math.min(3.0, Math.max(0.75, Math.round((propZoom + delta) * 100) / 100));
    propZoom = next;
    applyPropTransform(false);
}

function resetPropZoom() {
    propZoom = 1.0;
    propPanX = 0;
    propPanY = 0;
    isPropPanMode = false;
    updatePropPanButtonUI();
    applyPropTransform(false);
}

function cancelPropStrokeImmediately() {
    if (isDrawingPropStudio) {
        isDrawingPropStudio = false;
        document.getElementById('propStudioModal')?.classList.remove('drawing-active');
        try { propPadCtx.restore(); } catch (err) {}
        endPropLiveStroke();
        propStudioCurrentStroke = null;
        redrawPropPadFromStrokes();
    }
}

function togglePropPanMode() {
    isPropPanMode = !isPropPanMode;
    updatePropPanButtonUI();
}

function updatePropPanButtonUI() {
    const panBtn = document.getElementById('propPanToggleBtn');
    if (!panBtn) return;
    if (isPropPanMode) {
        panBtn.className = 'w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-[#2B5B35] text-white shadow-sm ring-2 ring-[#7DB852] transition active:scale-90';
        if (propPadCanvas) propPadCanvas.style.cursor = 'grab';
    } else {
        panBtn.className = 'w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-emerald-100 text-gray-700 transition active:scale-90';
        if (propPadCanvas) {
            propPadCanvas.style.cursor = (propStudioTool === 'eyedropper') ? 'crosshair' : (propStudioTool === 'eraser' ? 'cell' : 'crosshair');
        }
    }
}

function initPropStudioCanvas() {
    if (!propPadCanvas) {
        propPadCanvas = document.getElementById('propPadCanvas');
    }
    if (propPadCanvas && !propPadCtx) {
        propPadCtx = propPadCanvas.getContext('2d', { willReadFrequently: true });
        initPropStudioEventListeners();
        redrawPropPadFromStrokes();
    }
}

function openPropStudioModal() {
    const modal = document.getElementById('propStudioModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    initPropStudioCanvas();
    resetPropZoom();
    setPropStudioBrushType('pencil');
    selectPropColor('#78350f', null);
    updatePropInfoPillText();
    updatePropScalePreview();
}

function closePropStudioModal() {
    const modal = document.getElementById('propStudioModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    const cfg = document.getElementById('propConfigModal');
    if (cfg) {
        cfg.classList.add('hidden');
        cfg.classList.remove('flex');
    }
}

function clearPropPad() {
    if (propStudioStrokes.length === 0) return;
    if (typeof cuteAlert === 'function') {
        cuteAlert('Apakah kamu yakin ingin menghapus seluruh gambar properti?', 'Hapus Kanvas', '🗑️', true).then(ok => {
            if (ok) {
                propStudioStrokes = [];
                propStudioRedoStack = [];
                endPropLiveStroke();
                redrawPropPadFromStrokes();
                updatePropScalePreview();
            }
        });
    } else {
        if (confirm('Hapus seluruh gambar di kanvas?')) {
            propStudioStrokes = [];
            propStudioRedoStack = [];
            endPropLiveStroke();
            redrawPropPadFromStrokes();
            updatePropScalePreview();
        }
    }
}

// =========================================================================
// BRUSHES & TOOL SWITCHING
// =========================================================================

function setPropStudioBrushType(type) {
    propStudioBrushType = type;
    setPropStudioTool('pencil');

    const activePill = 'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition bg-[#2B5B35] text-white shadow-xs ring-2 ring-[#7DB852] cursor-pointer';
    const inactiveBrush = 'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition bg-white/80 text-[#2B5B35] hover:bg-[#eef5e6] border border-[#c5d9b7] cursor-pointer';

    const types = ['pencil', 'watercolor', 'crayon', 'glow'];
    types.forEach(t => {
        const btn = document.getElementById('propBrushTypeBtn-' + t);
        if (btn) {
            btn.className = (t === type) ? activePill : inactiveBrush;
        }
    });
}

function setPropStudioTool(toolName) {
    propStudioTool = toolName;
    isPropPanMode = false;
    updatePropPanButtonUI();

    const activePill = 'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition bg-[#2B5B35] text-white shadow-xs ring-2 ring-[#7DB852] cursor-pointer';
    const inactivePill = 'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition hover:bg-[#eef5e6] text-gray-700 cursor-pointer';
    const inactiveBrush = 'w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition bg-white/80 text-[#2B5B35] hover:bg-[#eef5e6] border border-[#c5d9b7] cursor-pointer';

    const types = ['pencil', 'watercolor', 'crayon', 'glow'];
    types.forEach(t => {
        const btn = document.getElementById('propBrushTypeBtn-' + t);
        if (btn) {
            btn.className = (toolName === 'pencil' && propStudioBrushType === t) ? activePill : inactiveBrush;
        }
    });

    const eraserBtn = document.getElementById('propStudioToolEraser');
    const eyedropBtn = document.getElementById('propStudioToolEyedrop');

    if (eraserBtn) eraserBtn.className = (toolName === 'eraser') ? activePill : inactivePill;
    if (eyedropBtn) eyedropBtn.className = (toolName === 'eyedropper') ? activePill : inactivePill;

    if (propPadCanvas) {
        if (toolName === 'eyedropper') propPadCanvas.style.cursor = 'crosshair';
        else if (toolName === 'eraser') propPadCanvas.style.cursor = 'cell';
        else propPadCanvas.style.cursor = 'crosshair';
    }
}

function setPropBrushSize(size, btnEl) {
    propStudioBrushSize = size;
    const slider = document.getElementById('propBrushSlider');
    if (slider) slider.value = size;
    const valText = document.getElementById('propBrushValText');
    if (valText) valText.textContent = size + 'px';

    document.querySelectorAll('.prop-size-btn').forEach(b => {
        b.classList.remove('bg-emerald-100', 'ring-1', 'ring-emerald-700');
        b.classList.add('hover:bg-gray-100');
    });
    if (btnEl) {
        btnEl.classList.add('bg-emerald-100', 'ring-1', 'ring-emerald-700');
        btnEl.classList.remove('hover:bg-gray-100');
    }
}

function setPropBrushSizeFromSlider(val) {
    propStudioBrushSize = parseInt(val, 10);
    const valText = document.getElementById('propBrushValText');
    if (valText) valText.textContent = val + 'px';
}

function selectPropColor(hexColor, btnEl) {
    propStudioCurrentColor = hexColor;
    setPropStudioTool('pencil');
    document.querySelectorAll('#propStudioModal .color-dot').forEach(el => el.classList.remove('active'));
    if (btnEl) {
        btnEl.classList.add('active');
    } else {
        document.querySelectorAll('#propStudioModal .color-dot').forEach(el => {
            const bg = el.style.backgroundColor;
            if (bg && (bg.toLowerCase() === hexColor.toLowerCase() || hexToRgb(bg) === hexToRgb(hexColor))) {
                el.classList.add('active');
            }
        });
    }
    const picker = document.getElementById('propCustomColorPicker');
    if (picker && hexColor) {
        try { picker.value = hexColor; } catch (e) {}
    }
    const preview = document.getElementById('activePropColorPreview');
    if (preview) preview.style.backgroundColor = hexColor;
}

function handleCustomPropColorPick(hexColor) {
    const pickerLabel = document.getElementById('customPropColorPickerLabel');
    selectPropColor(hexColor, pickerLabel);
}

// =========================================================================
// HABITAT & INFO PILL CONFIGURATION
// =========================================================================

function updatePropHabitatUI(habitat) {
    selectedPropHabitat = habitat;
    const habitats = ['land', 'water', 'both'];
    habitats.forEach(h => {
        const card = document.getElementById('propHabitatCard-' + h);
        if (card) {
            if (h === habitat) {
                card.className = 'relative flex flex-col items-center text-center p-2 rounded-xl border-2 border-[#2B5B35] bg-emerald-50/70 cursor-pointer transition shadow-2xs hover:border-[#2B5B35]';
                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            } else {
                card.className = 'relative flex flex-col items-center text-center p-2 rounded-xl border-2 border-gray-200 bg-white cursor-pointer transition shadow-2xs hover:border-[#2B5B35]';
                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = false;
            }
        }
    });
    updatePropInfoPillText();
}

function togglePropConfigModal() {
    const modal = document.getElementById('propConfigModal');
    if (!modal) return;
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        updatePropScalePreview();
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        updatePropInfoPillText();
    }
}

function updatePropInfoPillText() {
    const txt = document.getElementById('propInfoPillText');
    const nameInput = document.getElementById('customPropNameInput');
    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Pondok';
    const scaleStr = Number(selectedPropScale.toFixed(2)) + 'x';
    if (txt) txt.textContent = `${name} (${scaleStr})`;
}

// =========================================================================
// SISTEM LOGIKA PENGATUR SKALA PROPERTI (STUDIO PREVIEW & MATH ENGINE)
// =========================================================================

function setPropStudioScale(scaleValue, btnEl) {
    const clamped = Math.min(2.5, Math.max(0.3, Math.round(Number(scaleValue) * 100) / 100));
    selectedPropScale = clamped;

    const slider = document.getElementById('propScaleSlider');
    if (slider) slider.value = clamped;

    const display = document.getElementById('propScaleValueDisplay');
    if (display) display.textContent = `${clamped.toFixed(2)}x (${Math.round(clamped * 100)}%)`;

    document.querySelectorAll('.prop-scale-preset-btn').forEach(btn => {
        btn.className = 'prop-scale-preset-btn py-1 px-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-[10px] font-bold text-center transition active:scale-95 hover:border-[#7DB852]';
    });
    if (btnEl) {
        btnEl.className = 'prop-scale-preset-btn py-1 px-1.5 rounded-lg border border-[#2B5B35] bg-[#2B5B35] text-white text-[10px] font-bold text-center transition active:scale-95 shadow-xs';
    }

    updatePropInfoPillText();
    updatePropScalePreview();
}

function setPropStudioScaleFromSlider(val) {
    setPropStudioScale(parseFloat(val), null);
}

function updatePropScalePreview() {
    const canvas = document.getElementById('propScalePreviewCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw baseline ground
    ctx.strokeStyle = '#c5d9b7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(10, h - 14);
    ctx.lineTo(w - 10, h - 14);
    ctx.stroke();

    // Draw reference character / avatar (Fella / human scale benchmark ~ 44px)
    const avatarX = 35;
    const groundY = h - 14;

    // Head
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(avatarX, groundY - 32, 8, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(avatarX - 2.5, groundY - 32, 1.2, 0, Math.PI * 2);
    ctx.arc(avatarX + 2.5, groundY - 32, 1.2, 0, Math.PI * 2);
    ctx.fill();
    // Torso / Body
    ctx.fillStyle = '#2B5B35';
    ctx.beginPath();
    ctx.roundRect(avatarX - 7, groundY - 24, 14, 16, 4);
    ctx.fill();
    // Legs
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(avatarX - 3.5, groundY - 8);
    ctx.lineTo(avatarX - 3.5, groundY);
    ctx.moveTo(avatarX + 3.5, groundY - 8);
    ctx.lineTo(avatarX + 3.5, groundY);
    ctx.stroke();

    // Label Benchmark
    ctx.fillStyle = '#477431';
    ctx.font = 'bold 9px "Patrick Hand", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Avatar (1.0x)', avatarX, groundY + 11);

    // Draw player's drawn prop at current scale
    const propX = 145;
    const scale = selectedPropScale;

    if (propPadCanvas && propStudioStrokes.length > 0) {
        const trimmed = extractTrimmedPropCanvas();
        if (trimmed && trimmed.width > 0 && trimmed.height > 0) {
            const aspect = trimmed.width / trimmed.height;
            const baseVisualH = 36;
            const drawH = Math.max(12, Math.min(52, baseVisualH * scale));
            const drawW = drawH * aspect;

            ctx.save();
            ctx.drawImage(trimmed, propX - drawW / 2, groundY - drawH, drawW, drawH);
            ctx.restore();
        } else {
            drawFallbackPropPreview(ctx, propX, groundY, scale);
        }
    } else {
        drawFallbackPropPreview(ctx, propX, groundY, scale);
    }

    ctx.fillStyle = '#2B5B35';
    ctx.font = 'bold 9px "Patrick Hand", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Properti (${scale.toFixed(1)}x)`, propX, groundY + 11);
}

function drawFallbackPropPreview(ctx, x, groundY, scale) {
    const size = 32 * scale;
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(x - size / 2, groundY - size, size, size);
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(x - size * 0.65, groundY - size);
    ctx.lineTo(x, groundY - size * 1.5);
    ctx.lineTo(x + size * 0.65, groundY - size);
    ctx.closePath();
    ctx.fill();
}

// =========================================================================
// UNDO, REDO & REDRAW
// =========================================================================

function undoPropStroke() {
    if (propStudioStrokes.length === 0) return;
    const last = propStudioStrokes.pop();
    propStudioRedoStack.push(last);
    endPropLiveStroke();
    redrawPropPadFromStrokes();
    updatePropScalePreview();
    if (typeof playPencilSound === 'function') playPencilSound();
}

function redoPropStroke() {
    if (propStudioRedoStack.length === 0) return;
    const next = propStudioRedoStack.pop();
    propStudioStrokes.push(next);
    endPropLiveStroke();
    redrawPropPadFromStrokes();
    updatePropScalePreview();
    if (typeof playPencilSound === 'function') playPencilSound();
}

function redrawPropPadFromStrokes() {
    if (!propPadCanvas || !propPadCtx) return;
    propPadCtx.clearRect(0, 0, propPadCanvas.width, propPadCanvas.height);
    const hint = document.getElementById('drawPropBoxHint');
    if (hint) {
        hint.style.opacity = propStudioStrokes.length === 0 ? '0.4' : '0';
    }
    for (const stroke of propStudioStrokes) {
        if (!stroke.points || stroke.points.length === 0) continue;
        if (stroke.tool === 'eraser') {
            propPadCtx.save();
            propPadCtx.globalCompositeOperation = 'destination-out';
            propPadCtx.lineWidth = stroke.size * 1.8;
            propPadCtx.lineCap = 'round';
            propPadCtx.lineJoin = 'round';
            propPadCtx.beginPath();
            propPadCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                propPadCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            propPadCtx.stroke();
            propPadCtx.restore();
            continue;
        }

        const bType = stroke.brushType || 'pencil';
        if (bType === 'watercolor') {
            paintWatercolorLayer(propPadCtx, relaxPoints(stroke.points), stroke.color, stroke.size);
        } else if (bType === 'glow') {
            paintGlowLayer(propPadCtx, relaxPoints(stroke.points), stroke.color, stroke.size);
        } else if (bType === 'crayon') {
            for (let i = 1; i < stroke.points.length; i++) {
                paintCrayonSegment(propPadCtx, stroke.points[i - 1], stroke.points[i], stroke.color, stroke.size);
            }
        } else {
            // Classic Pencil
            propPadCtx.save();
            propPadCtx.globalCompositeOperation = 'source-over';
            propPadCtx.strokeStyle = stroke.color;
            propPadCtx.lineWidth = stroke.size;
            propPadCtx.lineCap = 'round';
            propPadCtx.lineJoin = 'round';
            propPadCtx.beginPath();
            propPadCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                propPadCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            propPadCtx.stroke();
            propPadCtx.restore();
        }
    }
}

// =========================================================================
// EVENT LISTENERS: POINTER, TOUCH, ZOOM & PAN
// =========================================================================
// INTERACTIVE DRAWING & VIEWPORT EVENT HANDLERS
// =========================================================================

var propStudioCurrentStroke = null;
var propStudioEventsInitialized = false;

function initPropStudioEventListeners() {
    if (propStudioEventsInitialized || !propPadCanvas) return;
    propStudioEventsInitialized = true;

    function getPos(e) {
        const rect = propPadCanvas.getBoundingClientRect();
        const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
        const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
        const scaleX = propPadCanvas.width / rect.width;
        const scaleY = propPadCanvas.height / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    const propStudioViewport = document.getElementById('propStudioViewport');
    if (propStudioViewport) {
        propStudioViewport.addEventListener('touchstart', (e) => {
            if (e.touches.length >= 2) {
                cancelPropStrokeImmediately();
                suppressPropDrawUntilAllUp = true;
                isTwoFingerTransformingProp = true;
                isPropPanning = false;

                const t1 = e.touches[0];
                const t2 = e.touches[1];
                propGestureInitialDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
                propGestureInitialZoom = propZoom;
                propGestureInitialMidX = (t1.clientX + t2.clientX) / 2;
                propGestureInitialMidY = (t1.clientY + t2.clientY) / 2;
                propGestureInitialPanX = propPanX;
                propGestureInitialPanY = propPanY;
            } else if (e.touches.length === 1) {
                if (suppressPropDrawUntilAllUp) return;
                const isOutside = (e.target !== propPadCanvas);
                if (isPropPanMode || isOutside) {
                    isPropPanning = true;
                    propPanStartX = e.touches[0].clientX - propPanX;
                    propPanStartY = e.touches[0].clientY - propPanY;
                }
            }
        }, { passive: false });

        propStudioViewport.addEventListener('touchmove', (e) => {
            if (e.touches.length >= 2 && isTwoFingerTransformingProp && propGestureInitialDist > 0) {
                e.preventDefault();
                const t1 = e.touches[0];
                const t2 = e.touches[1];
                const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
                const currentMidX = (t1.clientX + t2.clientX) / 2;
                const currentMidY = (t1.clientY + t2.clientY) / 2;

                const scale = currentDist / propGestureInitialDist;
                propZoom = Math.min(3.0, Math.max(0.75, Math.round(propGestureInitialZoom * scale * 100) / 100));

                const deltaX = currentMidX - propGestureInitialMidX;
                const deltaY = currentMidY - propGestureInitialMidY;

                const maxPan = Math.max(350, 420 * propZoom);
                propPanX = Math.max(-maxPan, Math.min(maxPan, propGestureInitialPanX + deltaX));
                propPanY = Math.max(-maxPan, Math.min(maxPan, propGestureInitialPanY + deltaY));

                applyPropTransform(true);
            } else if (e.touches.length === 1 && isPropPanning) {
                e.preventDefault();
                const maxPan = Math.max(350, 420 * propZoom);
                propPanX = Math.max(-maxPan, Math.min(maxPan, e.touches[0].clientX - propPanStartX));
                propPanY = Math.max(-maxPan, Math.min(maxPan, e.touches[0].clientY - propPanStartY));
                applyPropTransform(true);
            }
        }, { passive: false });

        const endTouchTransform = (e) => {
            if (e.touches.length < 2) {
                isTwoFingerTransformingProp = false;
            }
            if (e.touches.length === 0) {
                isPropPanning = false;
                suppressPropDrawUntilAllUp = false;
                activePropTouchPointers.clear();
            }
        };
        propStudioViewport.addEventListener('touchend', endTouchTransform, { passive: false });
        propStudioViewport.addEventListener('touchcancel', endTouchTransform, { passive: false });

        propStudioViewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.2 : -0.2;
            zoomPropCanvas(delta);
        }, { passive: false });

        propStudioViewport.addEventListener('pointerdown', (e) => {
            if (e.target !== propPadCanvas) {
                isPropPanning = true;
                propPanStartX = e.clientX - propPanX;
                propPanStartY = e.clientY - propPanY;
            }
        });
    }

    function startDrawing(e) {
        e.stopPropagation();
        if (typeof initAudio === 'function') initAudio();

        if (e.pointerType === 'touch') {
            activePropTouchPointers.add(e.pointerId);
            if (activePropTouchPointers.size >= 2 || suppressPropDrawUntilAllUp || !e.isPrimary) {
                cancelPropStrokeImmediately();
                suppressPropDrawUntilAllUp = true;
                return;
            }
        }

        if (suppressPropDrawUntilAllUp) return;

        if (isPropPanMode || e.button === 1 || e.shiftKey) {
            isPropPanning = true;
            propPanStartX = e.clientX - propPanX;
            propPanStartY = e.clientY - propPanY;
            if (propPadCanvas) propPadCanvas.style.cursor = 'grabbing';
            return;
        }

        if (e.button !== 0 && e.pointerType === 'mouse') return;

        const pos = getPos(e);

        if (propStudioTool === 'eyedropper') {
            const pixel = propPadCtx.getImageData(Math.floor(pos.x), Math.floor(pos.y), 1, 1).data;
            if (pixel[3] > 10) {
                const hex = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
                selectPropColor(hex, null);
                if (typeof playChimeSound === 'function') playChimeSound();
                if (typeof showGardenNotice === 'function') showGardenNotice(`🎨 Warna ${hex.toUpperCase()} tersalin!`);
            }
            return;
        }

        isDrawingPropStudio = true;
        document.getElementById('propStudioModal')?.classList.add('drawing-active');
        propStudioRedoStack = [];

        propStudioCurrentStroke = {
            tool: propStudioTool,
            brushType: propStudioBrushType,
            color: propStudioCurrentColor,
            size: propStudioBrushSize,
            points: [pos]
        };

        if (propStudioTool === 'eraser') {
            propPadCtx.save();
            propPadCtx.globalCompositeOperation = 'destination-out';
            propPadCtx.beginPath();
            propPadCtx.arc(pos.x, pos.y, Math.max(2, (propStudioBrushSize * 1.8) / 2), 0, Math.PI * 2);
            propPadCtx.fill();
            propPadCtx.restore();
        } else if (propStudioBrushType === 'watercolor' || propStudioBrushType === 'glow') {
            beginPropLiveStroke(propPadCtx, pos, propStudioBrushType, propStudioCurrentColor, propStudioBrushSize);
        } else if (propStudioBrushType === 'crayon') {
            propPadCtx.save();
            propPadCtx.globalCompositeOperation = 'source-over';
            propPadCtx.fillStyle = propStudioCurrentColor;
            const rad = Math.max(2, propStudioBrushSize * 0.65);
            for (let i = 0; i < 10; i++) {
                const ox = (Math.random() - 0.5) * rad * 1.5;
                const oy = (Math.random() - 0.5) * rad * 1.5;
                propPadCtx.globalAlpha = 0.45 + Math.random() * 0.45;
                propPadCtx.fillRect(pos.x + ox, pos.y + oy, 2.2, 2.2);
            }
            propPadCtx.restore();
        } else {
            // Classic Pencil
            propPadCtx.save();
            propPadCtx.globalCompositeOperation = 'source-over';
            propPadCtx.fillStyle = propStudioCurrentColor;
            propPadCtx.beginPath();
            propPadCtx.arc(pos.x, pos.y, Math.max(1, propStudioBrushSize / 2), 0, Math.PI * 2);
            propPadCtx.fill();
            propPadCtx.restore();
        }

        const hint = document.getElementById('drawPropBoxHint');
        if (hint) hint.style.opacity = '0';
    }

    function moveDrawing(e) {
        if (isPropPanning) {
            propPanX = e.clientX - propPanStartX;
            propPanY = e.clientY - propPanStartY;
            const maxPan = Math.max(350, 420 * propZoom);
            propPanX = Math.max(-maxPan, Math.min(maxPan, propPanX));
            propPanY = Math.max(-maxPan, Math.min(maxPan, propPanY));
            applyPropTransform(true);
            return;
        }

        if (!isDrawingPropStudio || !propStudioCurrentStroke || suppressPropDrawUntilAllUp || isTwoFingerTransformingProp) return;

        const pos = getPos(e);
        const lastPos = propStudioCurrentStroke.points[propStudioCurrentStroke.points.length - 1];
        propStudioCurrentStroke.points.push(pos);

        if (propStudioTool === 'eraser') {
            propPadCtx.save();
            propPadCtx.globalCompositeOperation = 'destination-out';
            propPadCtx.lineWidth = propStudioBrushSize * 1.8;
            propPadCtx.lineCap = 'round';
            propPadCtx.lineJoin = 'round';
            propPadCtx.beginPath();
            propPadCtx.moveTo(lastPos.x, lastPos.y);
            propPadCtx.lineTo(pos.x, pos.y);
            propPadCtx.stroke();
            propPadCtx.restore();
        } else if (propStudioBrushType === 'watercolor' || propStudioBrushType === 'glow') {
            extendPropLiveStroke(propPadCtx, lastPos, pos, propStudioBrushType, propStudioCurrentColor, propStudioBrushSize);
        } else if (propStudioBrushType === 'crayon') {
            paintCrayonSegment(propPadCtx, lastPos, pos, propStudioCurrentColor, propStudioBrushSize);
        } else {
            // Classic Pencil
            propPadCtx.save();
            propPadCtx.globalCompositeOperation = 'source-over';
            propPadCtx.strokeStyle = propStudioCurrentColor;
            propPadCtx.lineWidth = propStudioBrushSize;
            propPadCtx.lineCap = 'round';
            propPadCtx.lineJoin = 'round';
            propPadCtx.beginPath();
            propPadCtx.moveTo(lastPos.x, lastPos.y);
            propPadCtx.lineTo(pos.x, pos.y);
            propPadCtx.stroke();
            propPadCtx.restore();
        }
    }

    function endDrawing(e) {
        if (e && e.pointerType === 'touch' && e.pointerId !== undefined) {
            activePropTouchPointers.delete(e.pointerId);
            if (activePropTouchPointers.size === 0) {
                suppressPropDrawUntilAllUp = false;
            }
        }

        if (isPropPanning) {
            isPropPanning = false;
            if (propPadCanvas) {
                propPadCanvas.style.cursor = isPropPanMode ? 'grab' : (propStudioTool === 'eyedropper' ? 'crosshair' : (propStudioTool === 'eraser' ? 'cell' : 'crosshair'));
            }
        }

        if (!isDrawingPropStudio) return;
        isDrawingPropStudio = false;
        document.getElementById('propStudioModal')?.classList.remove('drawing-active');

        if (propLiveStroke) {
            endPropLiveStroke();
        }

        if (propStudioCurrentStroke && propStudioCurrentStroke.points.length > 0) {
            propStudioStrokes.push(propStudioCurrentStroke);
            propStudioCurrentStroke = null;
        }

        updatePropScalePreview();
    }

    propPadCanvas.addEventListener('pointerdown', startDrawing);
    window.addEventListener('pointermove', moveDrawing);
    window.addEventListener('pointerup', endDrawing);
    window.addEventListener('pointercancel', endDrawing);

    // Global keyboard shortcuts for Prop Studio
    window.addEventListener('keydown', (e) => {
        const modal = document.getElementById('propStudioModal');
        const isModalOpen = modal && !modal.classList.contains('hidden');
        if (!isModalOpen) return;

        if (e.key === 'Escape') {
            closePropStudioModal();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
            e.preventDefault();
            if (e.shiftKey) redoPropStroke();
            else undoPropStroke();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
            e.preventDefault();
            redoPropStroke();
            return;
        }
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            const k = e.key.toLowerCase();
            if (k === 'p') setPropStudioTool('pencil');
            else if (k === 'e') setPropStudioTool('eraser');
            else if (k === 'i') setPropStudioTool('eyedropper');
        }
    });
}

/**
 * Memotong bounding-box gambar properti custom agar rapi dan proporsional
 */
function extractTrimmedPropCanvas() {
    if (!propPadCanvas || !propPadCtx) return null;
    const w = propPadCanvas.width;
    const h = propPadCanvas.height;
    const imgData = propPadCtx.getImageData(0, 0, w, h).data;

    let minX = w, minY = h, maxX = 0, maxY = 0;
    let hasPixels = false;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const alpha = imgData[(y * w + x) * 4 + 3];
            if (alpha > 12) {
                hasPixels = true;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (!hasPixels) return null;

    const pad = 6;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w, maxX + pad);
    maxY = Math.min(h, maxY + pad);

    const cropW = Math.max(16, maxX - minX);
    const cropH = Math.max(16, maxY - minY);

    const trimmed = document.createElement('canvas');
    trimmed.width = cropW;
    trimmed.height = cropH;
    const tCtx = trimmed.getContext('2d');
    tCtx.drawImage(propPadCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

    return trimmed;
}

/**
 * Menyimpan properti kustom hasil gambar dan langsung memasangnya ke kebun!
 */
async function finishDrawingAndSpawnProp() {
    const trimmed = extractTrimmedPropCanvas();
    if (!trimmed) {
        if (typeof cuteAlert === 'function') {
            await cuteAlert('Gambarlah bentuk properti atau dekorasimu di kanvas terlebih dahulu!', 'Kanvas Kosong', '🎨');
        } else {
            alert('Gambarlah propertimu terlebih dahulu!');
        }
        return;
    }

    const nameInput = document.getElementById('customPropNameInput');
    const propName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Properti Kreasiku';
    const habitat = selectedPropHabitat || 'land';
    const scale = Number(selectedPropScale.toFixed(2)) || 1.0;

    const spriteDataUrl = trimmed.toDataURL('image/png');

    // Create an Image object for instantaneous rendering on canvas
    const img = new Image();
    img.src = spriteDataUrl;

    // Calculate spawn coordinates: near island center or current camera center
    const targetX = typeof panX !== 'undefined' ? Math.round(-panX / zoom + window.innerWidth / (2 * zoom)) : 2100;
    const targetY = typeof panY !== 'undefined' ? Math.round(-panY / zoom + window.innerHeight / (2 * zoom)) : 1600;

    const baseW = Math.round(trimmed.width * 0.45);
    const baseH = Math.round(trimmed.height * 0.45);

    const newProp = {
        id: 'prop_custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        type: 'custom_prop',
        name: propName,
        isCustomProp: true,
        x: targetX,
        y: targetY,
        width: baseW,
        height: baseH,
        scale: scale,
        habitat: habitat,
        rotation: 0,
        spriteDataUrl: spriteDataUrl,
        spriteImg: img,
        birthScale: 0.1 // Smooth birth bounce
    };

    if (typeof decorations !== 'undefined' && Array.isArray(decorations)) {
        decorations.push(newProp);
    } else if (typeof window !== 'undefined' && Array.isArray(window.decorations)) {
        window.decorations.push(newProp);
    }

    // Save to player's persistent custom props catalog
    const catalog = getCustomPropsCatalog();
    catalog.unshift({
        id: newProp.id,
        name: propName,
        spriteDataUrl: spriteDataUrl,
        width: baseW,
        height: baseH,
        habitat: habitat,
        scale: scale,
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    });
    saveCustomPropsCatalog(catalog);

    // Automatically select the new prop in the garden and show the scale widget
    selectedDecoration = newProp;
    if (typeof window !== 'undefined') window.selectedDecoration = newProp;

    closePropStudioModal();

    if (typeof incrementStat === 'function') {
        incrementStat('decorationsPlaced', 1);
        incrementStat('customCreations', 1);
    }

    if (typeof playPlantSound === 'function') {
        playPlantSound();
    } else if (typeof playChimeSound === 'function') {
        playChimeSound();
    }

    if (typeof showGardenNotice === 'function') {
        const habitatMap = { land: 'darat', water: 'air', both: 'darat/air' };
        showGardenNotice(`✨ Properti ${habitatMap[habitat]} "${propName}" (${scale.toFixed(1)}x) berhasil dipasang ke kebun!`);
    }

    // Update floating in-garden scale widget
    updateDecorScaleWidgetUI();

    // Auto-save immediately
    if (typeof scheduleAutoSave === 'function') {
        scheduleAutoSave(true);
    }
}

// ============================================================================
// SISTEM WIDGET PENGATUR SKALA PROPERTI INTERAKTIF DI KEBUN (#decorScaleWidget)
// ============================================================================

function updateDecorScaleWidgetUI() {
    const widget = document.getElementById('decorScaleWidget');
    if (!widget) return;

    const decor = (typeof selectedDecoration !== 'undefined' && selectedDecoration)
        ? selectedDecoration
        : (typeof window !== 'undefined' ? window.selectedDecoration : null);

    if (!decor) {
        widget.classList.add('hidden');
        return;
    }

    widget.classList.remove('hidden');

    const titleEl = document.getElementById('decorScaleWidgetTitle');
    const badgeEl = document.getElementById('decorScaleWidgetBadge');
    const slider = document.getElementById('decorScaleWidgetSlider');
    const previewThumb = document.getElementById('decorScaleWidgetThumb');

    const currentScale = typeof decor.scale === 'number' ? decor.scale : 1.0;
    const name = decor.name || (decor.type === 'custom_prop' ? 'Properti Kustom' : 'Objek Dekorasi');

    if (titleEl) titleEl.textContent = name;
    if (badgeEl) badgeEl.textContent = `${currentScale.toFixed(2)}x (${Math.round(currentScale * 100)}%)`;
    if (slider) slider.value = currentScale;

    if (previewThumb) {
        if (decor.spriteDataUrl) {
            previewThumb.innerHTML = `<img src="${decor.spriteDataUrl}" class="w-7 h-7 object-contain" alt="" />`;
        } else {
            previewThumb.innerHTML = `<span>🎨</span>`;
        }
    }
}

function setSelectedDecorScale(newScale) {
    const decor = (typeof selectedDecoration !== 'undefined' && selectedDecoration)
        ? selectedDecoration
        : (typeof window !== 'undefined' ? window.selectedDecoration : null);

    if (!decor) return;

    const clamped = Math.min(3.0, Math.max(0.3, Math.round(Number(newScale) * 100) / 100));
    decor.scale = clamped;

    const badgeEl = document.getElementById('decorScaleWidgetBadge');
    const slider = document.getElementById('decorScaleWidgetSlider');

    if (badgeEl) badgeEl.textContent = `${clamped.toFixed(2)}x (${Math.round(clamped * 100)}%)`;
    if (slider) slider.value = clamped;

    if (typeof scheduleAutoSave === 'function') {
        scheduleAutoSave();
    }
}

function changeSelectedDecorScale(delta) {
    const decor = (typeof selectedDecoration !== 'undefined' && selectedDecoration)
        ? selectedDecoration
        : (typeof window !== 'undefined' ? window.selectedDecoration : null);

    if (!decor) return;
    const current = typeof decor.scale === 'number' ? decor.scale : 1.0;
    setSelectedDecorScale(current + delta);
}

function setSelectedDecorScaleFromSlider(val) {
    setSelectedDecorScale(parseFloat(val));
}

function duplicateSelectedDecoration() {
    const decor = (typeof selectedDecoration !== 'undefined' && selectedDecoration)
        ? selectedDecoration
        : (typeof window !== 'undefined' ? window.selectedDecoration : null);

    if (!decor) return;

    const copyScale = typeof decor.scale === 'number' ? decor.scale : 1.0;
    const isCustom = decor.isCustomProp || decor.type === 'custom_prop';

    const copy = {
        id: (isCustom ? 'prop_custom_' : 'dec_') + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        type: decor.type,
        name: decor.name ? (decor.name + ' (Salinan)') : 'Salinan Properti',
        isCustomProp: isCustom,
        x: decor.x + 36,
        y: decor.y + 16,
        width: decor.width,
        height: decor.height,
        scale: copyScale,
        habitat: decor.habitat || 'land',
        rotation: decor.rotation || 0,
        spriteDataUrl: decor.spriteDataUrl || null,
        paintingDataUrl: decor.paintingDataUrl || null,
        paintingTitle: decor.paintingTitle || '',
        birthScale: 0.1
    };

    if (copy.spriteDataUrl) {
        const img = new Image();
        img.src = copy.spriteDataUrl;
        copy.spriteImg = img;
    }

    if (typeof decorations !== 'undefined' && Array.isArray(decorations)) {
        decorations.push(copy);
    } else if (typeof window !== 'undefined' && Array.isArray(window.decorations)) {
        window.decorations.push(copy);
    }

    selectedDecoration = copy;
    if (typeof window !== 'undefined') window.selectedDecoration = copy;

    updateDecorScaleWidgetUI();

    if (typeof playPlantSound === 'function') playPlantSound();
    if (typeof showGardenNotice === 'function') {
        showGardenNotice(`✨ "${copy.name}" diduplikat pada skala ${copyScale.toFixed(1)}x!`);
    }

    if (typeof scheduleAutoSave === 'function') {
        scheduleAutoSave(true);
    }
}

function removeSelectedDecoration() {
    const decor = (typeof selectedDecoration !== 'undefined' && selectedDecoration)
        ? selectedDecoration
        : (typeof window !== 'undefined' ? window.selectedDecoration : null);

    if (!decor) return;

    const propId = decor.id;
    if (typeof decorations !== 'undefined' && Array.isArray(decorations)) {
        decorations = decorations.filter(d => d.id !== propId);
        window.decorations = decorations;
    }

    selectedDecoration = null;
    if (typeof window !== 'undefined') window.selectedDecoration = null;

    updateDecorScaleWidgetUI();

    if (typeof playPopSound === 'function') playPopSound();
    if (typeof showGardenNotice === 'function') showGardenNotice('🗑️ Properti telah dihapus dari kebun.');

    if (typeof scheduleAutoSave === 'function') {
        scheduleAutoSave(true);
    }
}

function selectDecorationForScaling(id) {
    const decorList = (typeof decorations !== 'undefined' && Array.isArray(decorations))
        ? decorations
        : (typeof window !== 'undefined' && Array.isArray(window.decorations) ? window.decorations : []);

    const target = decorList.find(d => d.id === id);
    if (!target) return;

    selectedDecoration = target;
    if (typeof window !== 'undefined') window.selectedDecoration = target;

    // Pan camera to center on the decoration smoothly
    if (typeof panX !== 'undefined' && typeof zoom !== 'undefined') {
        panX = Math.round(window.innerWidth / 2 - target.x * zoom);
        panY = Math.round(window.innerHeight / 2 - target.y * zoom);
        if (typeof clampPan === 'function') clampPan();
    }

    updateDecorScaleWidgetUI();
}

function closeDecorScaleWidget() {
    selectedDecoration = null;
    if (typeof window !== 'undefined') window.selectedDecoration = null;
    updateDecorScaleWidgetUI();
}

// Global window bindings
window.openPropStudioModal = openPropStudioModal;
window.closePropStudioModal = closePropStudioModal;
window.clearPropPad = clearPropPad;
window.setPropStudioTool = setPropStudioTool;
window.setPropStudioBrushType = setPropStudioBrushType;
window.setPropBrushSize = setPropBrushSize;
window.setPropBrushSizeFromSlider = setPropBrushSizeFromSlider;
window.selectPropColor = selectPropColor;
window.handleCustomPropColorPick = handleCustomPropColorPick;
window.updatePropHabitatUI = updatePropHabitatUI;
window.setPropStudioHabitat = updatePropHabitatUI;
window.setPropStudioScale = setPropStudioScale;
window.setPropStudioScaleFromSlider = setPropStudioScaleFromSlider;
window.undoPropStroke = undoPropStroke;
window.redoPropStroke = redoPropStroke;
window.extractTrimmedPropCanvas = extractTrimmedPropCanvas;
window.finishDrawingAndSpawnProp = finishDrawingAndSpawnProp;
window.zoomPropCanvas = zoomPropCanvas;
window.resetPropZoom = resetPropZoom;
window.togglePropPanMode = togglePropPanMode;
window.togglePropConfigModal = togglePropConfigModal;
window.updatePropInfoPillText = updatePropInfoPillText;
window.updatePropScalePreview = updatePropScalePreview;
window.updateDecorScaleWidgetUI = updateDecorScaleWidgetUI;
window.setSelectedDecorScale = setSelectedDecorScale;
window.changeSelectedDecorScale = changeSelectedDecorScale;
window.setSelectedDecorScaleFromSlider = setSelectedDecorScaleFromSlider;
window.duplicateSelectedDecoration = duplicateSelectedDecoration;
window.removeSelectedDecoration = removeSelectedDecoration;
window.selectDecorationForScaling = selectDecorationForScaling;
window.closeDecorScaleWidget = closeDecorScaleWidget;
