/********************************************************************
 * FELLA'S GARDEN - CUSTOM PROPERTY & PROP STUDIO (js/prop_studio.js)
 * Studio gambar properti & dekorasi custom dengan peralatan lengkap:
 * Pensil, Penghapus, Pipet Warna, Undo/Redo, Palet Warna + Color Picker,
 * Pilihan Nama Properti, Pilihan Habitat (Darat / Air / Keduanya),
 * dan SISTEM LOGIKA PENGATUR SKALA PROPERTI (0.3x - 3.0x) baik saat
 * mendesain di studio maupun interaktif di kebun.
 ********************************************************************/

var propPadCanvas = null;
var propPadCtx = null;
var propStudioTool = 'pencil';
var propStudioCurrentColor = '#78350f'; // Warm wood / earth tone
var propStudioBrushSize = 8;
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
        panBtn.className = 'w-6 h-6 flex items-center justify-center rounded-full bg-[#2B5B35] text-white shadow-sm ring-2 ring-[#7DB852] transition active:scale-90';
        if (propPadCanvas) propPadCanvas.style.cursor = 'grab';
    } else {
        panBtn.className = 'w-6 h-6 flex items-center justify-center rounded-full hover:bg-emerald-100 text-gray-700 transition active:scale-90';
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
                redrawPropPadFromStrokes();
                updatePropScalePreview();
            }
        });
    } else {
        if (confirm('Hapus seluruh gambar di kanvas?')) {
            propStudioStrokes = [];
            propStudioRedoStack = [];
            redrawPropPadFromStrokes();
            updatePropScalePreview();
        }
    }
}

function setPropStudioTool(toolName) {
    propStudioTool = toolName;
    const pencilBtn = document.getElementById('propStudioToolPencil');
    const eraserBtn = document.getElementById('propStudioToolEraser');
    const eyedropBtn = document.getElementById('propStudioToolEyedrop');

    const activeCls = 'w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#2B5B35] text-white shadow-md ring-2 ring-[#7DB852] transition active:scale-95 cursor-pointer';
    const inactiveCls = 'w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/90 hover:bg-white text-gray-700 hover:text-[#2B5B35] border border-[#c5d9b7] shadow-xs transition active:scale-95 cursor-pointer';

    if (pencilBtn) pencilBtn.className = (toolName === 'pencil') ? activeCls : inactiveCls;
    if (eraserBtn) eraserBtn.className = (toolName === 'eraser') ? activeCls : inactiveCls;
    if (eyedropBtn) eyedropBtn.className = (toolName === 'eyedropper') ? activeCls : inactiveCls;

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
            if (bg && bg.toLowerCase() === hexColor.toLowerCase()) {
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

function updatePropHabitatUI(habitat) {
    selectedPropHabitat = habitat;
    const habitats = ['land', 'water', 'both'];
    habitats.forEach(h => {
        const card = document.getElementById('propHabitatCard-' + h);
        if (card) {
            if (h === habitat) {
                card.className = 'relative flex items-center gap-2 p-2.5 rounded-xl border-2 border-[#2B5B35] bg-emerald-50/70 cursor-pointer transition shadow-2xs hover:border-[#2B5B35]';
                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            } else {
                card.className = 'relative flex items-center gap-2 p-2.5 rounded-xl border-2 border-gray-200 bg-white cursor-pointer transition shadow-2xs hover:border-[#2B5B35]';
                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = false;
            }
        }
    });
    updatePropInfoPillText();
}

/**
 * SISTEM LOGIKA PENGATUR SKALA PROPERTI (STUDIO CREATION STAGE)
 */
function setPropStudioScale(scaleVal, btnEl) {
    const val = Math.min(3.0, Math.max(0.3, Math.round(Number(scaleVal) * 100) / 100));
    selectedPropScale = val;

    const slider = document.getElementById('propScaleSlider');
    if (slider) slider.value = val;

    const text = document.getElementById('propScaleValueDisplay');
    if (text) text.textContent = `${val.toFixed(2)}x (${Math.round(val * 100)}%)`;

    document.querySelectorAll('.prop-scale-preset-btn').forEach(b => {
        b.classList.remove('bg-[#2B5B35]', 'text-white', 'border-[#2B5B35]', 'shadow-xs');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-200', 'hover:border-[#7DB852]');
    });
    if (btnEl) {
        btnEl.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
        btnEl.classList.add('bg-[#2B5B35]', 'text-white', 'border-[#2B5B35]', 'shadow-xs');
    }

    updatePropInfoPillText();
    updatePropScalePreview();
}

function setPropStudioScaleFromSlider(val) {
    setPropStudioScale(parseFloat(val), null);
}

function updatePropScalePreview() {
    const previewCanvas = document.getElementById('propScalePreviewCanvas');
    if (!previewCanvas) return;
    const ctx = previewCanvas.getContext('2d');
    const w = previewCanvas.width;
    const h = previewCanvas.height;
    ctx.clearRect(0, 0, w, h);

    // Baseline ground line
    const groundY = h - 16;
    ctx.strokeStyle = '#c5d9b7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, groundY);
    ctx.lineTo(w - 8, groundY);
    ctx.stroke();

    // Reference companion silhouette (cute 34px flower/pet reference)
    ctx.fillStyle = 'rgba(71, 116, 49, 0.45)';
    const refX = 32;
    // Pet body & ears
    ctx.beginPath();
    ctx.ellipse(refX, groundY - 14, 11, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    // Pet head & ears
    ctx.beginPath();
    ctx.arc(refX, groundY - 26, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(refX - 7, groundY - 32);
    ctx.lineTo(refX - 4, groundY - 40);
    ctx.lineTo(refX - 1, groundY - 32);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(refX + 1, groundY - 32);
    ctx.lineTo(refX + 4, groundY - 40);
    ctx.lineTo(refX + 7, groundY - 32);
    ctx.fill();

    ctx.fillStyle = '#477431';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hewan', refX, groundY + 11);

    // Prop preview scaled by selectedPropScale
    const propX = w - 65;
    const trimmed = extractTrimmedPropCanvas();
    if (trimmed) {
        // Base normalized size roughly 44px
        const baseNormH = 44;
        const aspect = trimmed.width / trimmed.height;
        const drawH = baseNormH * selectedPropScale;
        const drawW = drawH * aspect;

        // Ground shadow
        ctx.fillStyle = 'rgba(25, 45, 20, 0.2)';
        ctx.beginPath();
        ctx.ellipse(propX, groundY + 1, drawW * 0.45, 4 * selectedPropScale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw trimmed prop resting on ground baseline
        ctx.drawImage(trimmed, propX - drawW / 2, groundY - drawH, drawW, drawH);
    } else {
        // Placeholder prop silhouette
        const drawH = 40 * selectedPropScale;
        const drawW = 46 * selectedPropScale;
        ctx.fillStyle = 'rgba(120, 53, 15, 0.5)';
        ctx.fillRect(propX - drawW / 2, groundY - drawH, drawW, drawH);
    }

    ctx.fillStyle = '#2B5B35';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${selectedPropScale.toFixed(1)}x`, propX, groundY + 11);
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
    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Pondok Santai';
    const habitat = selectedPropHabitat || 'land';
    const habitatMap = { land: 'Darat', water: 'Air', both: 'Darat/Air' };
    if (txt) txt.textContent = `${name} (${habitatMap[habitat] || 'Darat'} • ${selectedPropScale.toFixed(1)}x)`;
}

function undoPropStroke() {
    if (propStudioStrokes.length === 0) return;
    const popped = propStudioStrokes.pop();
    propStudioRedoStack.push(popped);
    redrawPropPadFromStrokes();
    updatePropScalePreview();
}

function redoPropStroke() {
    if (propStudioRedoStack.length === 0) return;
    const popped = propStudioRedoStack.pop();
    propStudioStrokes.push(popped);
    redrawPropPadFromStrokes();
    updatePropScalePreview();
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
        propPadCtx.save();
        propPadCtx.beginPath();
        propPadCtx.lineCap = 'round';
        propPadCtx.lineJoin = 'round';
        propPadCtx.lineWidth = stroke.size;
        if (stroke.tool === 'eraser') {
            propPadCtx.globalCompositeOperation = 'destination-out';
            propPadCtx.strokeStyle = 'rgba(0,0,0,1)';
        } else {
            propPadCtx.globalCompositeOperation = 'source-over';
            propPadCtx.strokeStyle = stroke.color;
        }
        propPadCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
            propPadCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        propPadCtx.stroke();
        propPadCtx.restore();
    }
}

function initPropStudioEventListeners() {
    if (!propPadCanvas) return;

    let currentStroke = null;

    function getPos(e) {
        const rect = propPadCanvas.getBoundingClientRect();
        const scaleX = propPadCanvas.width / rect.width;
        const scaleY = propPadCanvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
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
            }
        };
        propStudioViewport.addEventListener('touchend', endTouchTransform, { passive: false });
        propStudioViewport.addEventListener('touchcancel', endTouchTransform, { passive: false });
    }

    function startDrawing(e) {
        if (e.pointerType === 'touch') {
            activePropTouchPointers.add(e.pointerId);
            if (activePropTouchPointers.size >= 2 || suppressPropDrawUntilAllUp) return;
        }

        if (isPropPanMode || e.button === 1 || e.button === 2) {
            isPropPanning = true;
            propPanStartX = e.clientX - propPanX;
            propPanStartY = e.clientY - propPanY;
            return;
        }

        if (e.button !== 0) return;

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

        currentStroke = {
            tool: propStudioTool,
            color: propStudioCurrentColor,
            size: propStudioBrushSize,
            points: [pos]
        };

        propPadCtx.save();
        propPadCtx.beginPath();
        propPadCtx.lineCap = 'round';
        propPadCtx.lineJoin = 'round';
        propPadCtx.lineWidth = propStudioBrushSize;

        if (propStudioTool === 'eraser') {
            propPadCtx.globalCompositeOperation = 'destination-out';
            propPadCtx.strokeStyle = 'rgba(0,0,0,1)';
        } else {
            propPadCtx.globalCompositeOperation = 'source-over';
            propPadCtx.strokeStyle = propStudioCurrentColor;
        }

        propPadCtx.moveTo(pos.x, pos.y);
        propPadCtx.lineTo(pos.x, pos.y);
        propPadCtx.stroke();

        const hint = document.getElementById('drawPropBoxHint');
        if (hint) hint.style.opacity = '0';
    }

    function moveDrawing(e) {
        if (isPropPanning) {
            const maxPan = Math.max(350, 420 * propZoom);
            propPanX = Math.max(-maxPan, Math.min(maxPan, e.clientX - propPanStartX));
            propPanY = Math.max(-maxPan, Math.min(maxPan, e.clientY - propPanStartY));
            applyPropTransform(true);
            return;
        }

        if (!isDrawingPropStudio || !currentStroke) return;

        const pos = getPos(e);
        currentStroke.points.push(pos);

        propPadCtx.lineTo(pos.x, pos.y);
        propPadCtx.stroke();
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
        }

        if (!isDrawingPropStudio) return;
        isDrawingPropStudio = false;
        document.getElementById('propStudioModal')?.classList.remove('drawing-active');

        try { propPadCtx.restore(); } catch (err) {}

        if (currentStroke && currentStroke.points.length > 0) {
            propStudioStrokes.push(currentStroke);
            currentStroke = null;
        }

        updatePropScalePreview();
    }

    propPadCanvas.addEventListener('pointerdown', startDrawing);
    window.addEventListener('pointermove', moveDrawing);
    window.addEventListener('pointerup', endDrawing);
    window.addEventListener('pointercancel', endDrawing);
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
