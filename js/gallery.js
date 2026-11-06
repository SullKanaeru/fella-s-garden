/********************************************************************
 * FELLA'S GARDEN - UNIFIED GALLERY SYSTEM (js/gallery.js)
 * Manages Favorite Flowers, Favorite Animals & Favorite Decorations
 * with Tab Navigation, Re-planting, Animal Summoning, Decor Placement,
 * Animated Timelapse Replay, Storage & Renaming.
 ********************************************************************/

var galleryFlowers = [];
var galleryAnimals = [];
var galleryDecorations = [];
var currentGalleryTab = 'flowers'; // 'flowers' | 'animals' | 'exclusive' | 'decorations'
const FLOWER_STORAGE_KEY = 'fellas_garden_flower_gallery_v1';
const ANIMAL_STORAGE_KEY = 'fellas_garden_animal_gallery_v1';
const DECOR_STORAGE_KEY = 'fellas_garden_decor_gallery_v1';
var pendingSaveSprite = null;
var pendingSaveConfig = null;

function saveGalleryFlowersToStorage() {
    try {
        localStorage.setItem(FLOWER_STORAGE_KEY, JSON.stringify(galleryFlowers));
    } catch (e) {
        console.warn('LocalStorage save error (flowers):', e);
    }
}

function saveGalleryAnimalsToStorage() {
    try {
        localStorage.setItem(ANIMAL_STORAGE_KEY, JSON.stringify(galleryAnimals));
    } catch (e) {
        console.warn('LocalStorage save error (animals):', e);
    }
}

function saveGalleryDecorationsToStorage() {
    try {
        localStorage.setItem(DECOR_STORAGE_KEY, JSON.stringify(galleryDecorations));
    } catch (e) {
        console.warn('LocalStorage save error (decorations):', e);
    }
}

function initGallery() {
    // 1. Initialize Flowers
    try {
        const rawF = localStorage.getItem(FLOWER_STORAGE_KEY);
        if (rawF) galleryFlowers = JSON.parse(rawF);
    } catch (e) {
        galleryFlowers = [];
    }

    // Default cute starter showcase flowers if first visit
    if (!galleryFlowers || galleryFlowers.length === 0) {
        galleryFlowers = [
            {
                id: 'starter_gal_tulip',
                name: 'Tulip Matahari',
                dataUrl: (typeof makeProceduralFlowerSprite === 'function') 
                    ? makeProceduralFlowerSprite({ type: 'tulip', petalColor: '#F29B4B', centerColor: '#F7CE68', innerDotColor: '#DF5645', stemColor: '#3A6A37', scale: 1.1 }).toDataURL('image/png')
                    : '',
                strokes: [],
                createdAt: 'Klasik Kebun'
            },
            {
                id: 'starter_gal_daisy',
                name: 'Daisy Pink Pastel',
                dataUrl: (typeof makeProceduralFlowerSprite === 'function')
                    ? makeProceduralFlowerSprite({ type: 'daisy', petalColor: '#EDA4BD', centerColor: '#DF5645', innerDotColor: '#F7CE68', stemColor: '#3A6A37', scale: 1.1 }).toDataURL('image/png')
                    : '',
                strokes: [],
                createdAt: 'Klasik Kebun'
            },
            {
                id: 'starter_gal_rosebud',
                name: 'Mawar Senja',
                dataUrl: (typeof makeProceduralFlowerSprite === 'function')
                    ? makeProceduralFlowerSprite({ type: 'rosebud', petalColor: '#DF5645', centerColor: '#F7CE68', innerDotColor: '#F29B4B', stemColor: '#3A6A37', scale: 1.15 }).toDataURL('image/png')
                    : '',
                strokes: [],
                createdAt: 'Klasik Kebun'
            }
        ];
        saveGalleryFlowersToStorage();
    }

    // 2. Initialize Animals
    try {
        const rawA = localStorage.getItem(ANIMAL_STORAGE_KEY);
        if (rawA) galleryAnimals = JSON.parse(rawA);
    } catch (e) {
        galleryAnimals = [];
    }

    // Default starter favorite animal companions
    if (!galleryAnimals || galleryAnimals.length === 0) {
        galleryAnimals = [
            {
                id: 'fav_anm_mimi',
                name: 'Mimi',
                type: 'cat',
                variant: 'ginger',
                sound: 'cat',
                strokes: [],
                createdAt: 'Sahabat Kebun'
            },
            {
                id: 'fav_anm_bobi',
                name: 'Bobi',
                type: 'dog',
                variant: 'golden',
                sound: 'dog',
                strokes: [],
                createdAt: 'Sahabat Kebun'
            },
            {
                id: 'fav_anm_bunbun',
                name: 'Bunbun',
                type: 'rabbit',
                variant: 'white',
                sound: 'rabbit',
                strokes: [],
                createdAt: 'Sahabat Kebun'
            },
            {
                id: 'fav_anm_kiki',
                name: 'Kiki',
                type: 'butterfly',
                variant: 'violet',
                sound: 'butterfly',
                strokes: [],
                createdAt: 'Sahabat Kebun'
            }
        ];
        saveGalleryAnimalsToStorage();
    }

    // 3. Initialize Favorite Decorations
    try {
        const rawD = localStorage.getItem(DECOR_STORAGE_KEY);
        if (rawD) galleryDecorations = JSON.parse(rawD);
    } catch (e) {
        galleryDecorations = [];
    }

    if (!galleryDecorations || galleryDecorations.length === 0) {
        galleryDecorations = [
            {
                id: 'fav_dec_starter_easel',
                type: 'easel',
                name: 'Kuda-kuda Lukis Pameran',
                isCustomProp: false,
                habitat: 'land',
                createdAt: 'Favorit Kebun'
            },
            {
                id: 'fav_dec_starter_bench',
                type: 'bench',
                name: 'Bangku Taman Kayu',
                isCustomProp: false,
                habitat: 'land',
                createdAt: 'Favorit Kebun'
            },
            {
                id: 'fav_dec_starter_lantern',
                type: 'lantern',
                name: 'Lentera Taman Klasik',
                isCustomProp: false,
                habitat: 'land',
                createdAt: 'Favorit Kebun'
            },
            {
                id: 'fav_dec_starter_fountain',
                type: 'fountain',
                name: 'Air Mancur Batu',
                isCustomProp: false,
                habitat: 'land',
                createdAt: 'Favorit Kebun'
            },
            {
                id: 'fav_dec_starter_campfire',
                type: 'campfire',
                name: 'Api Unggun Berkemah',
                isCustomProp: false,
                habitat: 'land',
                createdAt: 'Favorit Kebun'
            }
        ];
        saveGalleryDecorationsToStorage();
    }

    updateGalleryBadge();
}

function updateGalleryBadge() {
    const fCount = galleryFlowers.length;
    const aCount = galleryAnimals.length;
    const dCount = (typeof galleryDecorations !== 'undefined') ? galleryDecorations.length : 0;
    const exDiscovered = (typeof getDiscoveredPets === 'function') ? getDiscoveredPets().length : 0;
    const totalCount = fCount + aCount + dCount;

    // Badge in the sidebar button
    const badge = document.getElementById('galleryCountBadge');
    if (badge) badge.textContent = totalCount;

    // Badges on the modal tabs
    const fTabBadge = document.getElementById('galFlowersCount');
    if (fTabBadge) fTabBadge.textContent = fCount;
    const aTabBadge = document.getElementById('galAnimalsCount');
    if (aTabBadge) aTabBadge.textContent = aCount;
    const dTabBadge = document.getElementById('galDecorCount');
    if (dTabBadge) dTabBadge.textContent = dCount;
    const exTabBadge = document.getElementById('galExclusiveCount');
    const totalEx = (typeof EXCLUSIVE_PET_LIST !== 'undefined' && Array.isArray(EXCLUSIVE_PET_LIST)) ? EXCLUSIVE_PET_LIST.length : 16;
    if (exTabBadge) exTabBadge.textContent = `${exDiscovered}/${totalEx}`;

    // Modal subtitle pill
    const pill = document.getElementById('galleryCounterPill');
    if (pill) {
        if (currentGalleryTab === 'flowers') {
            pill.textContent = `${fCount} Bunga`;
        } else if (currentGalleryTab === 'animals') {
            pill.textContent = `${aCount} Hewan`;
        } else if (currentGalleryTab === 'decorations') {
            pill.textContent = `${dCount} Dekorasi`;
        } else if (currentGalleryTab === 'exclusive') {
            pill.textContent = `${exDiscovered}/${totalEx} Pet Misterius`;
        }
    }
}

function openGalleryModal(initialTab = null) {
    const modal = document.getElementById('flowerGalleryModal') || document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (initialTab && (initialTab === 'flowers' || initialTab === 'animals' || initialTab === 'exclusive' || initialTab === 'decorations')) {
            switchGalleryTab(initialTab);
        } else {
            renderGalleryGrid();
            updateGalleryBadge();
        }
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('flowerGalleryModal') || document.getElementById('galleryModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    if (typeof stopExclusivePetsAnimationLoop === 'function') {
        stopExclusivePetsAnimationLoop();
    }
}

function switchGalleryTab(tabName) {
    currentGalleryTab = tabName;

    const flowerTabBtn = document.getElementById('galTabFlowers');
    const animalTabBtn = document.getElementById('galTabAnimals');
    const exTabBtn = document.getElementById('galTabExclusive');
    const decorTabBtn = document.getElementById('galTabDecorations');
    const searchInput = document.getElementById('gallerySearchInput');
    const tipText = document.getElementById('galleryTipText');
    const headerActionBtn = document.getElementById('galleryHeaderActionBtn');

    // Reset all tabs to inactive first
    const inactiveClass = 'px-4 py-2 rounded-t-xl font-hand font-bold text-xs sm:text-sm flex items-center gap-2 transition bg-[#e1ecd9] text-gray-600 hover:text-[#2B5B35] border-t-2 border-x-2 border-transparent';
    const activeClass = 'px-4 py-2 rounded-t-xl font-hand font-bold text-xs sm:text-sm flex items-center gap-2 transition bg-white text-[#2B5B35] border-t-2 border-x-2 border-[#2B5B35] shadow-xs active';

    if (flowerTabBtn) flowerTabBtn.className = inactiveClass;
    if (animalTabBtn) animalTabBtn.className = inactiveClass;
    if (exTabBtn) exTabBtn.className = inactiveClass;
    if (decorTabBtn) decorTabBtn.className = inactiveClass;

    if (tabName === 'flowers') {
        if (flowerTabBtn) flowerTabBtn.className = activeClass;
        if (searchInput) {
            searchInput.placeholder = 'Cari nama bunga...';
            searchInput.value = '';
        }
        if (tipText) {
            tipText.innerHTML = 'Tips: Klik <b>Tanam</b> untuk langsung menanam bunga ke kebun!';
        }
        if (headerActionBtn) {
            headerActionBtn.innerHTML = `
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Gambar Bunga Baru</span>
            `;
            headerActionBtn.onclick = () => { closeGalleryModal(); openFlowerStudioModal(); };
        }
    } else if (tabName === 'animals') {
        if (animalTabBtn) animalTabBtn.className = activeClass;
        if (searchInput) {
            searchInput.placeholder = 'Cari nama sahabat hewan...';
            searchInput.value = '';
        }
        if (tipText) {
            tipText.innerHTML = 'Tips: Klik <b>Panggil</b> untuk menghadirkan hewan favorit ke kebun!';
        }
        if (headerActionBtn) {
            headerActionBtn.innerHTML = `
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Gambar Hewan Baru</span>
            `;
            headerActionBtn.onclick = () => { closeGalleryModal(); openAnimalStudioModal(); };
        }
    } else if (tabName === 'decorations') {
        if (decorTabBtn) decorTabBtn.className = activeClass;
        if (searchInput) {
            searchInput.placeholder = 'Cari nama dekorasi...';
            searchInput.value = '';
        }
        if (tipText) {
            tipText.innerHTML = 'Tips: Klik <b>Pasang</b> untuk meletakkan dekorasi favorit ke kebun!';
        }
        if (headerActionBtn) {
            headerActionBtn.innerHTML = `
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Gambar Properti Baru</span>
            `;
            headerActionBtn.onclick = () => { closeGalleryModal(); openPropStudioModal(); };
        }
    } else if (tabName === 'exclusive') {
        if (exTabBtn) exTabBtn.className = activeClass;
        if (searchInput) {
            searchInput.placeholder = 'Cari pet misterius...';
            searchInput.value = '';
        }
        if (tipText) {
            tipText.innerHTML = 'Tips: Temukan dan rawat <b>Telur Misterius 🥚✨</b> yang muncul berkilau di kebun untuk menetaskan pet eksklusif langka!';
        }
        if (headerActionBtn) {
            headerActionBtn.innerHTML = `
                <span class="text-xs">🌿</span>
                <span>Kembali ke Kebun</span>
            `;
            headerActionBtn.onclick = () => {
                closeGalleryModal();
            };
        }
    }

    if (tabName === 'exclusive') {
        if (typeof startExclusivePetsAnimationLoop === 'function') {
            startExclusivePetsAnimationLoop();
        }
    } else {
        if (typeof stopExclusivePetsAnimationLoop === 'function') {
            stopExclusivePetsAnimationLoop();
        }
    }

    updateGalleryBadge();
    renderGalleryGrid();
}

function renderGalleryGrid(filterQuery = '') {
    const container = document.getElementById('galleryGridContainer');
    if (!container) return;

    if (currentGalleryTab === 'flowers') {
        renderFlowersGrid(container, filterQuery);
    } else if (currentGalleryTab === 'animals') {
        renderAnimalsGrid(container, filterQuery);
    } else if (currentGalleryTab === 'decorations') {
        renderDecorationsGrid(container, filterQuery);
    } else if (currentGalleryTab === 'exclusive') {
        renderExclusivePetsGrid(container, filterQuery);
    }
}

function renderFlowersGrid(container, filterQuery = '') {
    const q = filterQuery.toLowerCase().trim();
    const list = q ? galleryFlowers.filter(f => f.name.toLowerCase().includes(q)) : galleryFlowers;

    if (list.length === 0) {
        if (galleryFlowers.length === 0) {
            container.innerHTML = `
                <div class="py-12 flex flex-col items-center justify-center text-center">
                    <div class="w-16 h-16 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-700 flex items-center justify-center mb-3 shadow-inner text-2xl">
                        🌸
                    </div>
                    <h4 class="font-hand font-bold text-xl text-[#2B5B35] mb-1">Galeri Bunga Masih Kosong</h4>
                    <p class="text-xs sm:text-sm text-[#477431] max-w-sm mb-4">Yuk gambar bunga cantik di Studio Gambar, lalu klik <b>Simpan ke Galeri</b> untuk mengoleksinya!</p>
                    <button onclick="closeGalleryModal(); openFlowerStudioModal();" class="px-5 py-2 rounded-full bg-[#2B5B35] hover:bg-[#1f4627] text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8 1.5.8 3 .5 3-1 0-.8-.7-1.5-1-2.2-.4-.8-.5-1.8.2-2.5.8-.8 2-.8 3-.8h1c4.5 0 8-3.5 8-8 0-4.5-3.5-7.5-9.2-7.5z"/></svg>
                        <span>Buka Studio Gambar Bunga</span>
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="py-12 flex flex-col items-center justify-center text-center">
                    <p class="font-hand font-bold text-lg text-gray-500">Tidak ada bunga dengan nama "${filterQuery}"</p>
                </div>
            `;
        }
        return;
    }

    container.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            ${list.map(item => `
                <div class="bg-white/95 rounded-2xl border-2 border-[#d7e2ce] hover:border-[#7DB852] p-2.5 sm:p-3 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition duration-200 group">
                    <!-- Preview Box -->
                    <div class="w-full aspect-square rounded-xl bg-gradient-to-b from-[#fbfdf9] to-[#edf4e8] border border-[#e3ecdc] flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-[1.02] transition">
                        <img src="${item.dataUrl}" class="max-w-[85%] max-h-[85%] object-contain drop-shadow-md" alt="${item.name}">
                        <span class="absolute top-1.5 left-2 text-[10px] text-[#477431]/75 font-mono">${item.createdAt || ''}</span>
                    </div>

                    <!-- Name with inline rename -->
                    <div class="w-full mt-2 text-center">
                        <div class="flex items-center justify-center gap-1 group/title">
                            <span class="font-hand font-bold text-base sm:text-lg text-[#2B5B35] truncate max-w-[130px]" title="${item.name}">
                                ${item.name}
                            </span>
                            <button onclick="renameFlowerInGallery('${item.id}')" title="Ubah Nama Bunga" class="opacity-0 group-hover/title:opacity-100 hover:text-[#2B5B35] text-gray-400 transition">
                                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="w-full mt-2.5 flex items-center gap-1.5">
                        <button onclick="plantFlowerFromGallery('${item.id}')" class="flex-1 py-1.5 px-2.5 rounded-full bg-[#2B5B35] hover:bg-[#1f4627] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer" title="Tanam Bunga Ini ke Kebun">
                            <svg class="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                            <span>Tanam</span>
                        </button>
                        <button onclick="loadFlowerIntoStudio('${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f4faee] hover:bg-[#e6f4dc] text-[#2B5B35] flex items-center justify-center transition border border-[#b5cca3] shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Buka & Edit di Studio">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                        ${item.strokes && item.strokes.length > 0 ? `
                            <button onclick="playGalleryItemTimelapse('flower', '${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition border border-amber-300 shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Putar Timelapse Bunga">
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                            </button>
                        ` : ''}
                        <button onclick="deleteFlowerFromGallery('${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition border border-rose-200 shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Hapus dari Galeri">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderExclusivePetsGrid(container, filterQuery = '') {
    if (typeof EXCLUSIVE_PET_LIST === 'undefined') {
        container.innerHTML = `
            <div class="py-12 flex flex-col items-center justify-center text-center">
                <p class="font-hand font-bold text-lg text-gray-500">Memuat pet misterius...</p>
            </div>
        `;
        return;
    }

    const q = filterQuery.toLowerCase().trim();
    const discoveredList = (typeof getDiscoveredPets === 'function') ? getDiscoveredPets() : [];
    const list = q ? EXCLUSIVE_PET_LIST.filter(p => {
        const isDiscovered = discoveredList.includes(p.id);
        if (!isDiscovered) return '???'.includes(q) || p.tierLabel.toLowerCase().includes(q);
        return p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.tierLabel.toLowerCase().includes(q);
    }) : EXCLUSIVE_PET_LIST;

    const totalCount = EXCLUSIVE_PET_LIST.length;
    const foundCount = discoveredList.length;

    container.innerHTML = `
        <!-- Discovered Summary Banner -->
        <div class="mb-3.5 p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-purple-50 to-emerald-50 border-2 border-[#d7e2ce] flex flex-wrap items-center justify-between gap-2 shadow-xs">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg shadow-sm">
                    🥚
                </div>
                <div>
                    <h4 class="font-hand font-bold text-sm sm:text-base text-[#2B5B35] leading-tight">
                        Koleksi Pet Misterius Langka
                    </h4>
                    <p class="text-[11px] text-[#477431]">
                        Ditemukan: <b class="text-purple-700">${foundCount} / ${totalCount}</b> Makhluk Unik & Eksklusif
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] font-bold">
                <span class="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">🔥 Legendaris</span>
                <span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">⭐ Epic</span>
                <span class="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">💎 Rare</span>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">🌱 Uncommon</span>
            </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            ${list.map(p => {
                const isDiscovered = discoveredList.includes(p.id);
                const isCurrentlyInGarden = (typeof animals !== 'undefined' && Array.isArray(animals)) 
                    ? animals.some(a => (a.variant === p.id || a.petId === p.id)) 
                    : false;

                if (!isDiscovered) {
                    // UNDISCOVERED MYSTERY PET (???)
                    return `
                        <div class="bg-white/90 rounded-2xl border-2 border-dashed border-[#cbd5e1] p-2.5 sm:p-3 flex flex-col items-center justify-between shadow-xs transition duration-200 group">
                            <!-- Mysterious Dark Silhouette Box -->
                            <div class="w-full aspect-square rounded-xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-inner">
                                <div class="relative w-14 h-14 flex items-center justify-center">
                                    <div class="absolute inset-0 rounded-full bg-purple-500/20 blur-md animate-pulse"></div>
                                    <span class="text-3xl opacity-30 select-none">🥚</span>
                                    <span class="absolute font-hand font-bold text-3xl text-purple-300 drop-shadow">?</span>
                                </div>
                                <span class="absolute top-1.5 left-2 text-[10px] px-1.5 py-0.2 rounded-md bg-black/60 text-stone-300 font-mono border border-white/10">
                                    ${p.tierLabel}
                                </span>
                                <span class="absolute bottom-1.5 right-2 text-[10px] text-purple-300/80 font-mono">
                                    Terkunci 🔒
                                </span>
                            </div>

                            <!-- Name & Lore Placeholder -->
                            <div class="w-full mt-2 text-center">
                                <h4 class="font-hand font-bold text-base sm:text-lg text-gray-400">???</h4>
                                <p class="text-[10px] text-gray-400 line-clamp-2 mt-0.5">Pet misterius ini belum pernah ditetaskan di kebunmu.</p>
                            </div>

                            <!-- Disabled Locked Button -->
                            <div class="w-full mt-2.5">
                                <button disabled class="w-full py-1.5 px-2 rounded-xl bg-gray-100 text-gray-400 font-bold text-xs border border-gray-200 cursor-not-allowed flex items-center justify-center gap-1 shadow-none">
                                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    <span>Belum Terbuka</span>
                                </button>
                            </div>
                        </div>
                    `;
                }

                // DISCOVERED EXCLUSIVE PET
                let borderClass = 'border-emerald-300 hover:border-emerald-500';
                let bgGradient = 'from-emerald-50/80 to-white';
                if (p.tier === 'legendary') {
                    borderClass = 'border-amber-400 hover:border-amber-500 shadow-amber-100';
                    bgGradient = 'from-amber-50/90 via-orange-50/40 to-white';
                } else if (p.tier === 'epic') {
                    borderClass = 'border-purple-300 hover:border-purple-500 shadow-purple-100';
                    bgGradient = 'from-purple-50/90 via-pink-50/40 to-white';
                } else if (p.tier === 'rare') {
                    borderClass = 'border-sky-300 hover:border-sky-500 shadow-sky-100';
                    bgGradient = 'from-sky-50/90 via-blue-50/40 to-white';
                }

                return `
                    <div class="bg-white/95 rounded-2xl border-2 ${borderClass} p-2.5 sm:p-3 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition duration-200 group">
                        <!-- Preview Box with Dynamic Canvas Drawing -->
                        <div class="w-full aspect-square rounded-xl bg-gradient-to-b ${bgGradient} border border-[#e3ecdc] flex flex-col items-center justify-center p-1.5 relative overflow-hidden group-hover:scale-[1.02] transition">
                            <canvas id="ex_prev_canvas_${p.id}" width="96" height="96" class="w-full h-full object-contain drop-shadow-md"></canvas>
                            <span class="absolute top-1.5 left-2 text-[10px] px-1.5 py-0.2 rounded-full font-bold shadow-xs" style="background-color: ${p.tierBg}; color: ${p.tierColor}; border: 1px solid ${p.tierBorder};">
                                ${p.tierEmoji} ${p.tierLabel}
                            </span>
                            <span class="absolute bottom-1.5 right-2 text-[10px] px-1.5 py-0.2 rounded-md bg-white/80 text-[#2B5B35] font-mono border border-[#d2e0cb]">
                                ${p.habitat === 'flying' ? '☁️ Terbang' : (p.habitat === 'water' ? '🌊 Air' : '🌿 Darat')}
                            </span>
                        </div>

                        <!-- Name & Lore -->
                        <div class="w-full mt-2 text-center">
                            <h4 class="font-hand font-bold text-base sm:text-lg text-[#2B5B35] leading-tight truncate" title="${p.fullName}">
                                ${p.name}
                            </h4>
                            <p class="text-[10px] text-[#477431] font-semibold truncate mt-0.5">${p.title}</p>
                            <p class="text-[10px] text-gray-500 line-clamp-2 mt-1 leading-snug">${p.desc}</p>
                        </div>

                        <!-- Action Buttons -->
                        <div class="w-full mt-2.5 flex items-center gap-1.5">
                            ${isCurrentlyInGarden ? `
                                <button onclick="focusExclusivePetInGarden('${p.id}')" class="flex-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer" title="Fokus Kamera ke Pet Ini di Kebun">
                                    <svg class="w-3.5 h-3.5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                    <span>Ada di Kebun</span>
                                </button>
                            ` : `
                                <div class="flex-1 py-1 px-2 rounded-xl bg-emerald-50 text-[#2B5B35] font-bold text-xs flex items-center justify-center gap-1 border border-emerald-200">
                                    <span>✨ Telah Terbuka</span>
                                </div>
                            `}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    // Start live animation loop for discovered exclusive pets
    setTimeout(() => {
        if (typeof startExclusivePetsAnimationLoop === 'function') {
            startExclusivePetsAnimationLoop();
        }
    }, 20);
}

// Live animation loop for exclusive pets in gallery modal
var exclusivePetsAnimFrameId = null;

function startExclusivePetsAnimationLoop() {
    if (exclusivePetsAnimFrameId) {
        cancelAnimationFrame(exclusivePetsAnimFrameId);
        exclusivePetsAnimFrameId = null;
    }

    function animLoop(now) {
        const modal = document.getElementById('flowerGalleryModal') || document.getElementById('galleryModal');
        if (!modal || modal.classList.contains('hidden') || currentGalleryTab !== 'exclusive') {
            exclusivePetsAnimFrameId = null;
            return;
        }

        const discoveredList = typeof getDiscoveredPets === 'function' ? getDiscoveredPets() : [];
        if (typeof EXCLUSIVE_PET_LIST !== 'undefined' && Array.isArray(EXCLUSIVE_PET_LIST)) {
            for (let i = 0; i < EXCLUSIVE_PET_LIST.length; i++) {
                const p = EXCLUSIVE_PET_LIST[i];
                if (discoveredList.includes(p.id)) {
                    const cvs = document.getElementById(`ex_prev_canvas_${p.id}`);
                    if (cvs && typeof renderPetPreviewToCanvas === 'function') {
                        renderPetPreviewToCanvas(cvs, p.id, now);
                    }
                }
            }
        }

        exclusivePetsAnimFrameId = requestAnimationFrame(animLoop);
    }

    exclusivePetsAnimFrameId = requestAnimationFrame(animLoop);
}

function stopExclusivePetsAnimationLoop() {
    if (exclusivePetsAnimFrameId) {
        cancelAnimationFrame(exclusivePetsAnimFrameId);
        exclusivePetsAnimFrameId = null;
    }
}
window.startExclusivePetsAnimationLoop = startExclusivePetsAnimationLoop;
window.stopExclusivePetsAnimationLoop = stopExclusivePetsAnimationLoop;

// Summon an exclusive unlocked pet from the gallery to the garden
function summonExclusivePetFromGallery(petId) {
    if (typeof spawnExclusivePet === 'function') {
        const spawned = spawnExclusivePet(petId);
        if (spawned) {
            const def = (typeof getExclusivePetDef === 'function') ? getExclusivePetDef(petId) : null;
            const name = def ? def.name : 'Pet Misterius';
            if (typeof showGardenNotice === 'function') {
                showGardenNotice(`✨ "${name}" telah hadir dengan anggun di kebunmu!`);
            }
            if (typeof playChimeSound === 'function') playChimeSound();
            renderGalleryGrid();
            updateGalleryBadge();
        }
    }
}

// Focus camera on an active exclusive pet in the garden
function focusExclusivePetInGarden(petId) {
    if (typeof animals !== 'undefined' && Array.isArray(animals)) {
        const target = animals.find(a => (a.variant === petId || a.petId === petId));
        if (target && typeof startFollowingAnimalById === 'function') {
            startFollowingAnimalById(target.id);
            closeGalleryModal();
            if (typeof showGardenNotice === 'function') {
                showGardenNotice(`Mengikuti pandangan ${target.name} 🐾`);
            }
        }
    }
}

function renderAnimalsGrid(container, filterQuery = '') {
    const q = filterQuery.toLowerCase().trim();
    const list = q ? galleryAnimals.filter(a => a.name.toLowerCase().includes(q)) : galleryAnimals;

    if (list.length === 0) {
        if (galleryAnimals.length === 0) {
            container.innerHTML = `
                <div class="py-12 flex flex-col items-center justify-center text-center">
                    <div class="w-16 h-16 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-700 flex items-center justify-center mb-3 shadow-inner text-2xl">
                        🐾
                    </div>
                    <h4 class="font-hand font-bold text-xl text-[#2B5B35] mb-1">Belum Ada Hewan Favorit</h4>
                    <p class="text-xs sm:text-sm text-[#477431] max-w-sm mb-4">Kamu bisa memberi tanda ⭐ pada hewan yang sedang kamu perhatikan atau di menu Hewan untuk menyimpannya di sini!</p>
                    <div class="flex items-center gap-2">
                        <button onclick="closeGalleryModal(); openAnimalModal();" class="px-4 py-2 rounded-full bg-[#2B5B35] hover:bg-[#1f4627] text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-1.5">
                            <span>🐾 Buka Menu Hewan</span>
                        </button>
                        <button onclick="closeGalleryModal(); openAnimalStudioModal();" class="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-1.5">
                            <span>🎨 Gambar Hewan Sendiri</span>
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="py-12 flex flex-col items-center justify-center text-center">
                    <p class="font-hand font-bold text-lg text-gray-500">Tidak ada hewan dengan nama "${filterQuery}"</p>
                </div>
            `;
        }
        return;
    }

    container.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            ${list.map(item => {
                let badgeText = 'Sahabat';
                let avatarEmoji = '🐾';
                let dotColor = '#2B5B35';

                if (item.type === 'custom') {
                    badgeText = 'Hewan Ciptaanmu';
                    avatarEmoji = '🎨';
                } else if (typeof animalVariants !== 'undefined' && animalVariants[item.type]) {
                    const vInfo = animalVariants[item.type].find(v => v.id === item.variant) || animalVariants[item.type][0];
                    badgeText = vInfo.fullName || vInfo.name;
                    avatarEmoji = vInfo.emoji;
                    dotColor = vInfo.dot || '#2B5B35';
                }

                return `
                    <div class="bg-white/95 rounded-2xl border-2 border-[#d7e2ce] hover:border-[#7DB852] p-2.5 sm:p-3 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition duration-200 group">
                        <!-- Preview Box -->
                        <div class="w-full aspect-square rounded-xl bg-gradient-to-b from-[#fbfdf9] to-[#edf4e8] border border-[#e3ecdc] flex flex-col items-center justify-center p-2 relative overflow-hidden group-hover:scale-[1.02] transition">
                            ${item.spriteDataUrl ? `
                                <img src="${item.spriteDataUrl}" class="max-w-[80%] max-h-[80%] object-contain drop-shadow-md" alt="${item.name}">
                            ` : `
                                <div class="w-16 h-16 rounded-full bg-white border-2 border-[#d2e0cb] shadow-sm flex items-center justify-center text-3xl relative">
                                    <span>${avatarEmoji}</span>
                                    <span class="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white shadow-xs" style="background-color: ${dotColor};"></span>
                                </div>
                            `}
                            <span class="absolute top-1.5 left-2 text-[10px] text-[#477431]/75 font-mono">${item.createdAt || ''}</span>
                            <span class="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-white/90 border border-[#d2e0cb] text-[#2B5B35] font-bold">
                                ${badgeText}
                            </span>
                        </div>

                        <!-- Name with inline rename -->
                        <div class="w-full mt-2 text-center">
                            <div class="flex items-center justify-center gap-1 group/title">
                                <span class="font-hand font-bold text-base sm:text-lg text-[#2B5B35] truncate max-w-[130px]" title="${item.name}">
                                    ${item.name}
                                </span>
                                <button onclick="renameAnimalInGallery('${item.id}')" title="Ubah Nama Hewan" class="opacity-0 group-hover/title:opacity-100 hover:text-[#2B5B35] text-gray-400 transition">
                                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="w-full mt-2.5 flex items-center gap-1.5">
                            <button onclick="summonAnimalFromGallery('${item.id}')" class="flex-1 py-1.5 px-2.5 rounded-full bg-[#2B5B35] hover:bg-[#1f4627] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer" title="Panggil Hewan Ini ke Kebun">
                                <svg class="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                                <span>Panggil</span>
                            </button>
                            ${item.type === 'custom' ? `
                                <button onclick="loadAnimalIntoStudio('${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f4faee] hover:bg-[#e6f4dc] text-[#2B5B35] flex items-center justify-center transition border border-[#b5cca3] shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Edit di Studio Hewan">
                                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                </button>
                            ` : ''}
                            ${item.strokes && item.strokes.length > 0 ? `
                                <button onclick="playGalleryItemTimelapse('animal', '${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition border border-amber-300 shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Putar Timelapse Hewan">
                                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                                </button>
                            ` : ''}
                            <button onclick="deleteAnimalFromGallery('${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition border border-rose-200 shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Hapus dari Hewan Favorit">
                                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderDecorationsGrid(container, filterQuery = '') {
    const q = filterQuery.toLowerCase().trim();
    const list = q ? galleryDecorations.filter(d => d.name.toLowerCase().includes(q)) : galleryDecorations;

    if (list.length === 0) {
        if (galleryDecorations.length === 0) {
            container.innerHTML = `
                <div class="py-12 flex flex-col items-center justify-center text-center">
                    <div class="w-16 h-16 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-700 flex items-center justify-center mb-3 shadow-inner text-2xl">
                        🏮
                    </div>
                    <h4 class="font-hand font-bold text-xl text-[#2B5B35] mb-1">Belum Ada Dekorasi Favorit</h4>
                    <p class="text-xs sm:text-sm text-[#477431] max-w-sm mb-4">Kamu bisa memberi tanda ⭐ pada dekorasi di menu Dekorasi atau menggambar properti kreasi sendiri di <b>Studio Properti</b>!</p>
                    <div class="flex items-center gap-2">
                        <button onclick="closeGalleryModal(); openDecorModal();" class="px-4 py-2 rounded-full bg-[#2B5B35] hover:bg-[#1f4627] text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-1.5 cursor-pointer">
                            <span>🏮 Buka Menu Dekorasi</span>
                        </button>
                        <button onclick="closeGalleryModal(); openPropStudioModal();" class="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-1.5 cursor-pointer">
                            <span>🎨 Gambar Properti Sendiri</span>
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="py-12 flex flex-col items-center justify-center text-center">
                    <p class="font-hand font-bold text-lg text-gray-500">Tidak ada dekorasi dengan nama "${filterQuery}"</p>
                </div>
            `;
        }
        return;
    }

    container.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            ${list.map(item => {
                const isCustom = !!item.isCustomProp;
                const catDef = (typeof DECORATION_CATALOG !== 'undefined') ? DECORATION_CATALOG.find(c => c.type === item.type) : null;
                const iconSvg = catDef ? catDef.icon : '<svg class="w-8 h-8 text-[#2B5B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';
                const habitatBadge = item.habitat === 'both' ? '🌊 Air & Darat' : (item.habitat === 'water' ? '🌊 Air' : '🌿 Darat');
                const hasTimelapse = item.strokes && item.strokes.length > 0;

                return `
                    <div class="bg-white/95 rounded-2xl border-2 border-[#d7e2ce] hover:border-[#7DB852] p-2.5 sm:p-3 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition duration-200 group">
                        <!-- Preview Box -->
                        <div class="w-full aspect-square rounded-xl bg-gradient-to-b from-[#fbfdf9] to-[#edf4e8] border border-[#e3ecdc] flex flex-col items-center justify-center p-2 relative overflow-hidden group-hover:scale-[1.02] transition">
                            ${isCustom && item.spriteDataUrl ? `
                                <img src="${item.spriteDataUrl}" class="max-w-[80%] max-h-[80%] object-contain drop-shadow-md" alt="${item.name}">
                            ` : `
                                <div class="w-14 h-14 rounded-2xl bg-white border border-[#c5d9b7] flex items-center justify-center shadow-xs text-2xl">
                                    ${iconSvg}
                                </div>
                            `}
                            <span class="absolute top-1.5 left-2 text-[10px] text-[#477431]/75 font-mono">${item.createdAt || ''}</span>
                            <span class="absolute bottom-1.5 right-2 text-[9px] px-1.5 py-0.2 rounded-md bg-white/85 text-[#2B5B35] font-mono border border-[#d2e0cb]">
                                ${habitatBadge}
                            </span>
                        </div>

                        <!-- Name with inline rename -->
                        <div class="w-full mt-2 text-center">
                            <div class="flex items-center justify-center gap-1 group/title">
                                <span class="font-hand font-bold text-base sm:text-lg text-[#2B5B35] truncate max-w-[130px]" title="${item.name}">
                                    ${item.name}
                                </span>
                                ${isCustom ? `
                                    <button onclick="renameDecorInGallery('${item.id}')" title="Ubah Nama Dekorasi" class="opacity-0 group-hover/title:opacity-100 hover:text-[#2B5B35] text-gray-400 transition cursor-pointer">
                                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                    </button>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="w-full mt-2.5 flex items-center gap-1.5">
                            <button onclick="placeDecorFromGallery('${item.id}')" class="flex-1 py-1.5 px-2.5 rounded-full bg-[#2B5B35] hover:bg-[#1f4627] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer" title="Pasang ke Kebun">
                                <svg class="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                                <span>Pasang</span>
                            </button>
                            ${isCustom ? `
                                <button onclick="loadPropIntoStudio('${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f4faee] hover:bg-[#e6f4dc] text-[#2B5B35] flex items-center justify-center transition border border-[#b5cca3] shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Edit di Studio Properti">
                                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                </button>
                            ` : ''}
                            ${hasTimelapse ? `
                                <button onclick="playGalleryItemTimelapse('decor', '${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition border border-amber-300 shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Putar Timelapse Pembuatan">
                                    <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                                </button>
                            ` : ''}
                            <button onclick="deleteDecorFromGallery('${item.id}')" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition border border-rose-200 shadow-2xs cursor-pointer active:scale-95 shrink-0" title="Hapus dari Favorit">
                                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Check if a decoration is favorited
function isDecorFavorited(d) {
    if (!d) return false;
    if (typeof d === 'string') {
        return galleryDecorations.some(item => item.type === d || item.id === d);
    }
    return galleryDecorations.some(item => {
        if (item.id === d.id || (d.decorId && item.id === d.decorId) || (item.decorId && item.decorId === d.id)) return true;
        if (d.type && d.type !== 'custom_prop' && item.type === d.type) return true;
        if (d.isCustomProp && item.isCustomProp) {
            if (item.spriteDataUrl && item.spriteDataUrl === d.spriteDataUrl) return true;
            if (item.name && item.name === d.name) return true;
        }
        return false;
    });
}

// Toggle favorite decoration
function toggleFavoriteDecor(d) {
    if (!d) return;
    let type = typeof d === 'string' ? d : d.type;
    let isCustom = typeof d === 'object' && (d.isCustomProp || d.type === 'custom_prop');

    const existingIndex = galleryDecorations.findIndex(item => {
        if (typeof d === 'object') {
            if (item.id === d.id || (d.decorId && item.id === d.decorId) || (item.decorId && item.decorId === d.id)) return true;
            if (isCustom && item.isCustomProp) {
                if (item.spriteDataUrl && item.spriteDataUrl === d.spriteDataUrl) return true;
                if (item.name && item.name === d.name) return true;
            }
        }
        if (!isCustom && item.type === type) return true;
        return false;
    });

    if (existingIndex >= 0) {
        const removed = galleryDecorations.splice(existingIndex, 1)[0];
        saveGalleryDecorationsToStorage();
        updateGalleryBadge();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`"${removed.name}" dihapus dari Dekorasi Favorit.`);
        }
    } else {
        let name = 'Dekorasi';
        let habitat = 'land';
        let spriteDataUrl = null;
        let strokes = [];

        if (typeof d === 'object') {
            name = d.name || 'Dekorasi';
            habitat = d.habitat || 'land';
            spriteDataUrl = d.spriteDataUrl || null;
            strokes = d.strokes ? JSON.parse(JSON.stringify(d.strokes)) : [];
        } else if (typeof DECORATION_CATALOG !== 'undefined') {
            const cat = DECORATION_CATALOG.find(c => c.type === type);
            if (cat) {
                name = cat.name;
                habitat = cat.habitat || 'land';
            }
        }

        const newEntry = {
            id: (typeof d === 'object' && d.id && d.id.startsWith('fav_dec_')) ? d.id : ('fav_dec_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)),
            decorId: (typeof d === 'object') ? d.id : null,
            type: type,
            name: name,
            isCustomProp: !!isCustom,
            habitat: habitat,
            spriteDataUrl: spriteDataUrl,
            strokes: strokes,
            createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        };
        galleryDecorations.unshift(newEntry);
        saveGalleryDecorationsToStorage();
        updateGalleryBadge();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`"${newEntry.name}" ditambahkan ke Dekorasi Favorit! ⭐`);
        }
        if (typeof playChimeSound === 'function') playChimeSound();
    }

    if (typeof renderDecorModalCatalog === 'function') renderDecorModalCatalog();
    if (!document.getElementById('flowerGalleryModal')?.classList.contains('hidden')) {
        renderGalleryGrid();
    }
}

function toggleFavoriteCatalogDecor(type) {
    toggleFavoriteDecor(type);
}

function toggleFavoriteActiveDecor(id) {
    if (typeof decorations !== 'undefined' && Array.isArray(decorations)) {
        const d = decorations.find(x => x.id === id);
        if (d) {
            toggleFavoriteDecor(d);
            return;
        }
    }
    const inGal = galleryDecorations.find(x => x.id === id);
    if (inGal) {
        toggleFavoriteDecor(inGal);
    }
}

function placeDecorFromGallery(id) {
    const item = galleryDecorations.find(d => d.id === id);
    if (!item) return;

    if (item.isCustomProp) {
        // Place custom prop in garden
        const targetX = typeof panX !== 'undefined' ? Math.round(-panX / zoom + window.innerWidth / (2 * zoom)) : 2100;
        const targetY = typeof panY !== 'undefined' ? Math.round(-panY / zoom + window.innerHeight / (2 * zoom)) : 1600;
        const img = new Image();
        img.onload = () => {
            const baseW = Math.round((img.width || 80) * 0.45);
            const baseH = Math.round((img.height || 80) * 0.45);
            const newProp = {
                id: 'prop_custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
                type: 'custom_prop',
                name: item.name,
                isCustomProp: true,
                x: targetX,
                y: targetY,
                width: baseW,
                height: baseH,
                scale: item.scale || 1.0,
                habitat: item.habitat || 'land',
                rotation: 0,
                spriteDataUrl: item.spriteDataUrl,
                spriteImg: img,
                strokes: item.strokes ? JSON.parse(JSON.stringify(item.strokes)) : [],
                birthScale: 0.1
            };
            if (typeof decorations !== 'undefined' && Array.isArray(decorations)) {
                decorations.push(newProp);
            }
            if (typeof selectedDecoration !== 'undefined') {
                selectedDecoration = newProp;
                if (typeof window !== 'undefined') window.selectedDecoration = newProp;
            }
            closeGalleryModal();
            if (typeof updateDecorScaleWidgetUI === 'function') updateDecorScaleWidgetUI();
            if (typeof playPlantSound === 'function') playPlantSound();
            if (typeof showGardenNotice === 'function') {
                showGardenNotice(`✨ "${item.name}" dipasang ke kebun!`);
            }
            if (typeof scheduleAutoSave === 'function') scheduleAutoSave(true);
        };
        img.src = item.spriteDataUrl;
    } else {
        // Standard catalog decoration
        closeGalleryModal();
        if (typeof startPlacingDecoration === 'function') {
            startPlacingDecoration(item.type);
        }
    }
}

function loadPropIntoStudio(id) {
    const item = galleryDecorations.find(d => d.id === id);
    if (!item || !item.isCustomProp) return;
    closeGalleryModal();
    if (typeof openPropStudioModal === 'function') openPropStudioModal();

    const nameInput = document.getElementById('customPropNameInput');
    if (nameInput) nameInput.value = item.name || '';
    if (typeof selectPropHabitat === 'function' && item.habitat) {
        selectPropHabitat(item.habitat);
    }
    if (typeof selectedPropScale !== 'undefined' && item.scale) {
        selectedPropScale = item.scale;
        const scaleVal = document.getElementById('propScaleValue');
        if (scaleVal) scaleVal.textContent = `${item.scale.toFixed(1)}x`;
        const scaleSlider = document.getElementById('propScaleSlider');
        if (scaleSlider) scaleSlider.value = item.scale;
    }

    if (item.strokes && item.strokes.length > 0 && typeof propStudioStrokes !== 'undefined') {
        propStudioStrokes = JSON.parse(JSON.stringify(item.strokes));
        if (typeof propStudioRedoStack !== 'undefined') propStudioRedoStack = [];
        if (typeof redrawPropPadFromStrokes === 'function') redrawPropPadFromStrokes();
        if (typeof updatePropScalePreview === 'function') updatePropScalePreview();
    } else if (item.spriteDataUrl && typeof propPadCanvas !== 'undefined' && propPadCanvas) {
        const img = new Image();
        img.onload = () => {
            if (typeof propPadCtx !== 'undefined' && propPadCtx) {
                propPadCtx.clearRect(0, 0, propPadCanvas.width, propPadCanvas.height);
                const maxDim = propPadCanvas.width * 0.72;
                const scale = Math.min(maxDim / img.width, maxDim / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const x = (propPadCanvas.width - w) / 2;
                const y = (propPadCanvas.height - h) / 2;
                propPadCtx.drawImage(img, x, y, w, h);
                const hint = document.getElementById('drawPropBoxHint');
                if (hint) hint.style.opacity = '0';
                if (typeof updatePropScalePreview === 'function') updatePropScalePreview();
            }
        };
        img.src = item.spriteDataUrl;
    }
    if (typeof showGardenNotice === 'function') {
        showGardenNotice(`Dekorasi "${item.name}" dimuat ke Studio Properti!`);
    }
}

function loadAnimalIntoStudio(id) {
    const item = galleryAnimals.find(a => a.id === id);
    if (!item || item.type !== 'custom') return;
    closeGalleryModal();
    if (typeof openAnimalStudioModal === 'function') openAnimalStudioModal();

    const nameInput = document.getElementById('customAnimalNameInput');
    if (nameInput) nameInput.value = item.name || '';
    const soundSelect = document.getElementById('customAnimalSoundSelect');
    if (soundSelect && item.sound) soundSelect.value = item.sound;
    if (typeof selectAnimalHabitat === 'function' && item.habitat) {
        selectAnimalHabitat(item.habitat);
    }

    if (item.strokes && item.strokes.length > 0 && typeof animalStudioStrokes !== 'undefined') {
        animalStudioStrokes = JSON.parse(JSON.stringify(item.strokes));
        if (typeof animalStudioRedoStack !== 'undefined') animalStudioRedoStack = [];
        if (typeof redrawAnimalPadFromStrokes === 'function') redrawAnimalPadFromStrokes();
    } else if (item.spriteDataUrl && typeof animalPadCanvas !== 'undefined' && animalPadCanvas) {
        const img = new Image();
        img.onload = () => {
            if (typeof animalPadCtx !== 'undefined' && animalPadCtx) {
                animalPadCtx.clearRect(0, 0, animalPadCanvas.width, animalPadCanvas.height);
                const maxDim = animalPadCanvas.width * 0.72;
                const scale = Math.min(maxDim / img.width, maxDim / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const x = (animalPadCanvas.width - w) / 2;
                const y = (animalPadCanvas.height - h) / 2;
                animalPadCtx.drawImage(img, x, y, w, h);
                const hint = document.getElementById('drawAnimalBoxHint');
                if (hint) hint.style.opacity = '0';
            }
        };
        img.src = item.spriteDataUrl;
    }
    if (typeof showGardenNotice === 'function') {
        showGardenNotice(`Hewan "${item.name}" dimuat ke Studio Hewan!`);
    }
}

async function renameDecorInGallery(id) {
    const item = galleryDecorations.find(d => d.id === id);
    if (!item) return;
    let newName;
    if (typeof cutePrompt === 'function') {
        newName = await cutePrompt('Beri nama baru untuk dekorasi ini:', item.name, 'Ganti Nama Dekorasi', 'Nama dekorasi...', '🏮');
    } else {
        newName = prompt('Beri nama baru untuk dekorasi ini:', item.name);
    }
    if (newName && newName.trim()) {
        item.name = newName.trim();
        saveGalleryDecorationsToStorage();
        renderGalleryGrid();
        showGardenNotice(`Nama dekorasi favorit diubah menjadi "${item.name}"`);
    }
}

async function deleteDecorFromGallery(id) {
    const item = galleryDecorations.find(d => d.id === id);
    if (!item) return;
    let confirmed = true;
    if (typeof cuteConfirm === 'function') {
        confirmed = await cuteConfirm(`Hapus "${item.name}" dari Dekorasi Favorit?`, 'Hapus Dekorasi', true, 'Ya, Hapus', '🗑️');
    } else {
        confirmed = confirm(`Hapus "${item.name}" dari Dekorasi Favorit?`);
    }
    if (confirmed) {
        galleryDecorations = galleryDecorations.filter(d => d.id !== id);
        saveGalleryDecorationsToStorage();
        updateGalleryBadge();
        renderGalleryGrid();
        if (typeof renderDecorModalCatalog === 'function') renderDecorModalCatalog();
        showGardenNotice(`"${item.name}" dihapus dari Dekorasi Favorit.`);
    }
}

// Universal Timelapse Replayer for Gallery Items
// Smooth requestAnimationFrame-based player with video export (MediaRecorder).
var activeGalleryTimelapseItem = null;
var activeGalleryTimelapseToken = 0;
var galleryTimelapseRecording = false;
var galleryTimelapseReturnToGallery = false;

function playGalleryItemTimelapse(category, id) {
    let item = null;
    if (category === 'flower') item = galleryFlowers.find(f => f.id === id);
    else if (category === 'animal') item = galleryAnimals.find(a => a.id === id);
    else if (category === 'decor') item = galleryDecorations.find(d => d.id === id);

    if (!item) return;
    if (!item.strokes || item.strokes.length === 0) {
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`Karya "${item.name}" belum memiliki riwayat goresan timelapse.`);
        }
        return;
    }

    // Close the gallery first, then open the timelapse viewer
    galleryTimelapseReturnToGallery = true;
    closeGalleryModal();

    activeGalleryTimelapseItem = item;
    const modal = document.getElementById('galleryTimelapseModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    const nameEl = document.getElementById('galleryTimelapseName');
    if (nameEl) nameEl.textContent = item.name || 'Timelapse Karya';

    setGalleryTimelapseRecordingUI(false);
    runGalleryTimelapse(item);
}

function restartGalleryTimelapse() {
    if (galleryTimelapseRecording) return;
    if (activeGalleryTimelapseItem) {
        runGalleryTimelapse(activeGalleryTimelapseItem);
    }
}

function closeGalleryTimelapseModal() {
    if (galleryTimelapseRecording) {
        if (typeof showGardenNotice === 'function') {
            showGardenNotice('Tunggu sebentar, video sedang direkam... 🎬');
        }
        return;
    }
    activeGalleryTimelapseToken++;
    const modal = document.getElementById('galleryTimelapseModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    activeGalleryTimelapseItem = null;
    if (galleryTimelapseReturnToGallery) {
        galleryTimelapseReturnToGallery = false;
        openGalleryModal();
    }
}

function setGalleryTimelapseProgress(p) {
    const bar = document.getElementById('galleryTimelapseProgressBar');
    if (bar) bar.style.width = `${Math.max(0, Math.min(100, p * 100)).toFixed(1)}%`;
}

function setGalleryTimelapseRecordingUI(isRecording) {
    galleryTimelapseRecording = isRecording;
    const replayBtn = document.getElementById('galleryTimelapseReplayBtn');
    const saveBtn = document.getElementById('galleryTimelapseSaveBtn');
    const closeBtn = document.getElementById('galleryTimelapseCloseBtn');
    const badge = document.getElementById('galleryTimelapseRecBadge');
    [replayBtn, saveBtn, closeBtn].forEach(b => {
        if (!b) return;
        b.disabled = isRecording;
        b.classList.toggle('opacity-50', isRecording);
        b.classList.toggle('pointer-events-none', isRecording);
    });
    if (saveBtn) {
        const label = saveBtn.querySelector('[data-label]');
        if (label) label.textContent = isRecording ? 'Merekam...' : 'Simpan Video';
    }
    if (badge) badge.classList.toggle('hidden', !isRecording);
}

// Compute the transform so all stroke points fit nicely in the canvas
function computeTimelapseFit(strokes, cw, ch) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, maxSize = 4;
    for (const s of strokes) {
        if (!s || !s.points) continue;
        if (s.size > maxSize) maxSize = s.size;
        for (const p of s.points) {
            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
        }
    }
    if (!isFinite(minX)) return { scale: 1, ox: 0, oy: 0 };
    const pad = maxSize;
    minX -= pad; minY -= pad; maxX += pad; maxY += pad;
    const bw = Math.max(1, maxX - minX);
    const bh = Math.max(1, maxY - minY);
    const margin = cw * 0.1;
    const scale = Math.min((cw - margin * 2) / bw, (ch - margin * 2) / bh, 4);
    return {
        scale,
        ox: (cw - bw * scale) / 2 - minX * scale,
        oy: (ch - bh * scale) / 2 - minY * scale
    };
}

// Apply the visual style of a brush to a context
function applyTimelapseBrushStyle(ctx, s) {
    const color = s.color || '#2B5B35';
    const size = s.size || 5;
    const bType = s.brushType || 'pencil';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = size;
    if (bType === 'watercolor') {
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = size * 1.6;
    } else if (bType === 'glow') {
        ctx.shadowColor = color;
        ctx.shadowBlur = size * 1.4;
        ctx.lineWidth = size * 0.9;
    } else if (bType === 'crayon') {
        ctx.globalAlpha = 0.85;
    }
}

// Draw a (partial) stroke path: points[0..count-1] plus optional fractional tail
function traceTimelapsePath(ctx, pts, count, frac) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    if (count <= 1 && !(frac > 0 && pts[1])) {
        // single dot
        ctx.lineTo(pts[0].x + 0.01, pts[0].y + 0.01);
        return;
    }
    for (let i = 1; i < count; i++) ctx.lineTo(pts[i].x, pts[i].y);
    if (frac > 0 && pts[count]) {
        const a = pts[count - 1], b = pts[count];
        ctx.lineTo(a.x + (b.x - a.x) * frac, a.y + (b.y - a.y) * frac);
    }
}

/**
 * Smooth rAF-driven timelapse playback.
 * options.onFrame(progress) — called each frame; options.holdMs — extra hold time at the end.
 * Resolves true when finished, false when cancelled.
 */
function runGalleryTimelapse(item, options = {}) {
    const token = ++activeGalleryTimelapseToken;
    const canvas = document.getElementById('galleryTimelapseCanvas');
    if (!canvas) return Promise.resolve(false);
    const ctx = canvas.getContext('2d');
    const cw = canvas.width, ch = canvas.height;

    const strokes = (item.strokes || []).filter(s => s && s.points && s.points.length > 0);
    if (strokes.length === 0) return Promise.resolve(false);

    const fit = computeTimelapseFit(strokes, cw, ch);

    // Offscreen ink layer (committed strokes, eraser works without touching background)
    const ink = document.createElement('canvas');
    ink.width = cw; ink.height = ch;
    const ictx = ink.getContext('2d');
    ictx.setTransform(fit.scale, 0, 0, fit.scale, fit.ox, fit.oy);

    // Timeline: each stroke gets time proportional to its length + small pause
    const SEG_WEIGHT = 1, STROKE_PAUSE = 6;
    let totalUnits = 0;
    const timeline = strokes.map(s => {
        const units = Math.max(1, s.points.length - 1) * SEG_WEIGHT;
        const entry = { s, start: totalUnits, units };
        totalUnits += units + STROKE_PAUSE;
        return entry;
    });
    const totalPoints = strokes.reduce((a, s) => a + s.points.length, 0);
    const drawDuration = Math.max(2500, Math.min(9000, totalPoints * 9));
    const holdMs = options.holdMs != null ? options.holdMs : 600;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(1, '#edf4e8');

    let committedIdx = 0;      // strokes fully committed to ink
    let eraserDrawn = 0;       // segments of current eraser stroke already applied
    const caption = item.name || '';

    function commitStroke(entry) {
        const s = entry.s;
        ictx.save();
        if (s.tool === 'eraser') {
            ictx.globalCompositeOperation = 'destination-out';
            ictx.strokeStyle = '#000';
            ictx.lineCap = 'round';
            ictx.lineJoin = 'round';
            ictx.lineWidth = (s.size || 8) * 1.6;
        } else {
            applyTimelapseBrushStyle(ictx, s);
        }
        traceTimelapsePath(ictx, s.points, s.points.length, 0);
        ictx.stroke();
        ictx.restore();
    }

    function composite(progress, liveEntry, liveCount, liveFrac) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, cw, ch);

        if (liveEntry && liveEntry.s.tool === 'eraser') {
            // Apply eraser progressively directly onto the ink layer
            const s = liveEntry.s;
            ictx.save();
            ictx.globalCompositeOperation = 'destination-out';
            ictx.strokeStyle = '#000';
            ictx.lineCap = 'round';
            ictx.lineJoin = 'round';
            ictx.lineWidth = (s.size || 8) * 1.6;
            traceTimelapsePath(ictx, s.points, liveCount, liveFrac);
            ictx.stroke();
            ictx.restore();
        }
        ctx.drawImage(ink, 0, 0);

        if (liveEntry && liveEntry.s.tool !== 'eraser') {
            ctx.setTransform(fit.scale, 0, 0, fit.scale, fit.ox, fit.oy);
            applyTimelapseBrushStyle(ctx, liveEntry.s);
            traceTimelapsePath(ctx, liveEntry.s.points, liveCount, liveFrac);
            ctx.stroke();
        }
        ctx.restore();

        // Caption watermark for exported video
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = '#2B5B35';
        ctx.font = `bold ${Math.round(cw * 0.035)}px "Patrick Hand", "Comic Sans MS", sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(caption, cw * 0.04, ch - ch * 0.03);
        ctx.textAlign = 'right';
        ctx.globalAlpha = 0.5;
        ctx.fillText("Fella's Garden", cw * 0.96, ch - ch * 0.03);
        ctx.restore();

        setGalleryTimelapseProgress(progress);
        if (typeof options.onFrame === 'function') options.onFrame(progress);
    }

    return new Promise(resolve => {
        let startTs = null;
        function frame(ts) {
            if (token !== activeGalleryTimelapseToken) { resolve(false); return; }
            if (startTs === null) startTs = ts;
            const elapsed = ts - startTs;
            const t = Math.min(1, elapsed / drawDuration);
            // gentle ease-in-out so the start and end feel smooth
            const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            const unitPos = eased * totalUnits;

            // Commit finished strokes
            while (committedIdx < timeline.length && unitPos >= timeline[committedIdx].start + timeline[committedIdx].units) {
                const entry = timeline[committedIdx];
                if (entry.s.tool === 'eraser') {
                    // eraser was applied progressively; finish the rest
                    commitStroke(entry);
                } else {
                    commitStroke(entry);
                }
                committedIdx++;
                eraserDrawn = 0;
            }

            let liveEntry = null, liveCount = 0, liveFrac = 0;
            if (committedIdx < timeline.length) {
                const entry = timeline[committedIdx];
                if (unitPos > entry.start) {
                    const local = (unitPos - entry.start) / SEG_WEIGHT; // segments drawn (float)
                    const whole = Math.floor(local);
                    liveEntry = entry;
                    liveCount = Math.min(entry.s.points.length, whole + 1);
                    liveFrac = local - whole;
                }
            }

            composite(t, liveEntry, liveCount, liveFrac);

            if (elapsed < drawDuration + holdMs) {
                requestAnimationFrame(frame);
            } else {
                if (typeof playChimeSound === 'function' && !options.silent) playChimeSound();
                resolve(true);
            }
        }
        requestAnimationFrame(frame);
    });
}

function pickTimelapseVideoMime() {
    if (typeof MediaRecorder === 'undefined') return null;
    const candidates = [
        'video/mp4;codecs=avc1.42E01E',
        'video/mp4;codecs=avc1',
        'video/mp4',
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm'
    ];
    for (const m of candidates) {
        try { if (MediaRecorder.isTypeSupported(m)) return m; } catch (e) {}
    }
    return '';
}

async function saveGalleryTimelapseVideo() {
    const item = activeGalleryTimelapseItem;
    const canvas = document.getElementById('galleryTimelapseCanvas');
    if (!item || !canvas || galleryTimelapseRecording) return;

    const mime = pickTimelapseVideoMime();
    if (mime === null || typeof canvas.captureStream !== 'function') {
        if (typeof showGardenNotice === 'function') {
            showGardenNotice('Maaf, browser ini belum mendukung perekaman video timelapse 🙏');
        }
        return;
    }

    setGalleryTimelapseRecordingUI(true);
    const stream = canvas.captureStream(60);
    let recorder;
    try {
        recorder = mime ? new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6000000 })
                        : new MediaRecorder(stream);
    } catch (e) {
        setGalleryTimelapseRecordingUI(false);
        if (typeof showGardenNotice === 'function') showGardenNotice('Gagal memulai perekaman video 😢');
        return;
    }

    const chunks = [];
    recorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) chunks.push(e.data); };
    const stopped = new Promise(res => { recorder.onstop = res; });

    recorder.start(100);
    const finished = await runGalleryTimelapse(item, { holdMs: 1500, silent: true });
    // let the final frame be captured
    await new Promise(r => setTimeout(r, 120));
    if (recorder.state !== 'inactive') recorder.stop();
    await stopped;
    stream.getTracks().forEach(t => t.stop());
    setGalleryTimelapseRecordingUI(false);

    if (!finished || chunks.length === 0) {
        if (typeof showGardenNotice === 'function') showGardenNotice('Perekaman dibatalkan.');
        return;
    }

    const type = recorder.mimeType || mime || 'video/webm';
    const ext = type.includes('mp4') ? 'mp4' : 'webm';
    const blob = new Blob(chunks, { type: type.split(';')[0] });
    const safeName = (item.name || 'karya').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-') || 'karya';
    const fileName = `timelapse-${safeName}.${ext}`;

    // Prefer native share sheet on touch devices (iPad/iPhone), else download
    let shared = false;
    try {
        const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
        if (isTouch && navigator.canShare && typeof File !== 'undefined') {
            const file = new File([blob], fileName, { type: blob.type });
            if (navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file], title: item.name || 'Timelapse' });
                shared = true;
            }
        }
    } catch (e) {
        if (e && e.name === 'AbortError') shared = true; // user cancelled share sheet
    }

    if (!shared) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
    }

    if (typeof playChimeSound === 'function') playChimeSound();
    if (typeof showGardenNotice === 'function') showGardenNotice(`🎬 Video timelapse "${item.name}" berhasil disimpan!`);
}


// Check if an animal is currently in the favorites gallery
function isAnimalFavorited(a) {
    if (!a) return false;
    return galleryAnimals.some(item => {
        if (item.id === a.id) return true;
        if (a.type === 'custom' && item.spriteDataUrl && item.spriteDataUrl === a.spriteDataUrl) return true;
        if (a.type !== 'custom' && item.type === a.type && item.variant === a.variant && item.name === a.name) return true;
        return false;
    });
}

// Toggle favorite status for an animal
function toggleFavoriteAnimal(a) {
    if (!a) return;
    const existingIndex = galleryAnimals.findIndex(item => {
        if (item.id === a.id) return true;
        if (a.type === 'custom' && item.spriteDataUrl && item.spriteDataUrl === a.spriteDataUrl) return true;
        if (a.type !== 'custom' && item.type === a.type && item.variant === a.variant && item.name === a.name) return true;
        return false;
    });

    if (existingIndex >= 0) {
        const removed = galleryAnimals.splice(existingIndex, 1)[0];
        saveGalleryAnimalsToStorage();
        updateGalleryBadge();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`"${removed.name}" dihapus dari Hewan Favorit.`);
        }
    } else {
        const newEntry = {
            id: 'fav_anm_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            name: a.name || 'Sahabat',
            type: a.type || 'rabbit',
            variant: a.variant || 'default',
            sound: a.sound || 'chime',
            habitat: a.habitat || (a.type === 'fish' ? 'water' : (a.type === 'butterfly' ? 'flying' : 'land')),
            spriteDataUrl: a.spriteDataUrl || null,
            createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        };
        galleryAnimals.unshift(newEntry);
        saveGalleryAnimalsToStorage();
        updateGalleryBadge();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`"${newEntry.name}" ditambahkan ke Hewan Favorit! ⭐`);
        }
        if (typeof playChimeSound === 'function') playChimeSound();
    }

    // Refresh UI elements that display favorite state
    if (typeof renderActiveAnimalsList === 'function') renderActiveAnimalsList();
    if (typeof updateFollowBanner === 'function') updateFollowBanner();
    if (!document.getElementById('flowerGalleryModal')?.classList.contains('hidden') || 
        !document.getElementById('galleryModal')?.classList.contains('hidden')) {
        renderGalleryGrid();
    }
}

function toggleFavoriteAnimalById(animalId) {
    // Look first in active world animals
    if (typeof animals !== 'undefined' && Array.isArray(animals)) {
        const active = animals.find(a => a.id === animalId);
        if (active) {
            toggleFavoriteAnimal(active);
            return;
        }
    }
    // Otherwise look in gallery animals
    const inGal = galleryAnimals.find(a => a.id === animalId);
    if (inGal) {
        toggleFavoriteAnimal(inGal);
    }
}

function toggleFavoriteFollowedAnimal() {
    if (typeof followedAnimal !== 'undefined' && followedAnimal) {
        toggleFavoriteAnimal(followedAnimal);
    }
}

function summonAnimalFromGallery(id) {
    const item = galleryAnimals.find(a => a.id === id);
    if (!item) return;

    let spawned = null;
    if (item.type === 'custom' && item.spriteDataUrl) {
        if (typeof spawnCustomAnimalInstance === 'function') {
            spawned = spawnCustomAnimalInstance({
                name: item.name,
                spriteDataUrl: item.spriteDataUrl,
                sound: item.sound || 'chime',
                habitat: item.habitat || 'land'
            });
        }
    } else if (typeof spawnAnimal === 'function') {
        spawned = spawnAnimal(item.type, item.name, item.variant);
    }

    closeGalleryModal();

    if (spawned && typeof startFollowingAnimal === 'function') {
        startFollowingAnimal(spawned);
    } else if (typeof showGardenNotice === 'function') {
        showGardenNotice(`"${item.name}" telah dipanggil ke kebun!`);
    }
}

async function renameAnimalInGallery(id) {
    const item = galleryAnimals.find(a => a.id === id);
    if (!item) return;
    let newName;
    if (typeof cutePrompt === 'function') {
        newName = await cutePrompt('Beri nama baru untuk hewan ini:', item.name, 'Ganti Nama Hewan', 'Nama hewan...', '🐾');
    } else {
        newName = prompt('Beri nama baru untuk hewan ini:', item.name);
    }
    if (newName && newName.trim()) {
        item.name = newName.trim();
        saveGalleryAnimalsToStorage();
        renderGalleryGrid();
        showGardenNotice(`Nama hewan favorit diubah menjadi "${item.name}"`);
    }
}

async function deleteAnimalFromGallery(id) {
    const item = galleryAnimals.find(a => a.id === id);
    if (!item) return;
    let confirmed = true;
    if (typeof cuteConfirm === 'function') {
        confirmed = await cuteConfirm(`Hapus "${item.name}" dari daftar Hewan Favorit?`, 'Hapus Hewan Favorit', true, 'Ya, Hapus', '🗑️');
    } else {
        confirmed = confirm(`Hapus "${item.name}" dari daftar Hewan Favorit?`);
    }
    if (confirmed) {
        galleryAnimals = galleryAnimals.filter(a => a.id !== id);
        saveGalleryAnimalsToStorage();
        updateGalleryBadge();
        renderGalleryGrid();
        if (typeof renderActiveAnimalsList === 'function') renderActiveAnimalsList();
        if (typeof updateFollowBanner === 'function') updateFollowBanner();
        showGardenNotice(`"${item.name}" telah dihapus dari Hewan Favorit.`);
    }
}

// Helper to convert base64 dataUrl into an offscreen canvas
function dataUrlToCanvas(dataUrl, callback) {
    const img = new Image();
    img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const cCtx = c.getContext('2d');
        cCtx.drawImage(img, 0, 0);
        callback(c);
    };
    img.src = dataUrl;
}

function plantFlowerFromGallery(id) {
    const item = galleryFlowers.find(f => f.id === id);
    if (!item) return;
    dataUrlToCanvas(item.dataUrl, (canvas) => {
        pendingFlowerSprite = canvas;
        closeGalleryModal();
        activatePlantingMode();
        showGardenNotice(`Bunga "${item.name}" siap ditanam!`);
    });
}

function loadFlowerIntoStudio(id) {
    const item = galleryFlowers.find(f => f.id === id);
    if (!item) return;
    const img = new Image();
    img.onload = () => {
        saveFlowerPadState();
        flowerPadCtx.clearRect(0, 0, flowerPadCanvas.width, flowerPadCanvas.height);
        const maxDim = flowerPadCanvas.width * 0.72;
        const scale = Math.min(maxDim / img.width, maxDim / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (flowerPadCanvas.width - w) / 2;
        const y = (flowerPadCanvas.height - h) / 2;
        flowerPadCtx.drawImage(img, x, y, w, h);
        updatePendingSpriteFromPad();
        updateDraftBadge();
        const hint = document.getElementById('drawBoxHint');
        if (hint) hint.style.opacity = '0';

        // RESTORE STROKES FOR TIMELAPSE
        if (typeof window.setRecordedFlowerStrokes === 'function') {
            window.setRecordedFlowerStrokes(item.strokes || []);
        }

        closeGalleryModal();
        openFlowerStudioModal();
        showGardenNotice(`Bunga "${item.name}" dimuat ke studio!`);
    };
    img.src = item.dataUrl;
}

async function renameFlowerInGallery(id) {
    const item = galleryFlowers.find(f => f.id === id);
    if (!item) return;
    let newName;
    if (typeof cutePrompt === 'function') {
        newName = await cutePrompt('Beri nama baru untuk bunga ini:', item.name, 'Ganti Nama Bunga', 'Nama bunga...', '🌸');
    } else {
        newName = prompt('Beri nama baru untuk bunga ini:', item.name);
    }
    if (newName && newName.trim()) {
        item.name = newName.trim();
        saveGalleryFlowersToStorage();
        renderGalleryGrid();
        showGardenNotice(`Nama bunga diubah menjadi "${item.name}"`);
    }
}

async function deleteFlowerFromGallery(id) {
    const item = galleryFlowers.find(f => f.id === id);
    if (!item) return;
    let confirmed = true;
    if (typeof cuteConfirm === 'function') {
        confirmed = await cuteConfirm(`Hapus bunga "${item.name}" dari galeri?`, 'Hapus Bunga', true, 'Ya, Hapus', '🗑️');
    } else {
        confirmed = confirm(`Hapus bunga "${item.name}" dari galeri?`);
    }
    if (confirmed) {
        galleryFlowers = galleryFlowers.filter(f => f.id !== id);
        saveGalleryFlowersToStorage();
        renderGalleryGrid();
        updateGalleryBadge();
        showGardenNotice(`Bunga "${item.name}" telah dihapus.`);
    }
}

// Configurable Save Dialog handler for Flowers, Animals, and Decorations
function openSaveToGalleryDialogWithConfig(config) {
    if (!config || !config.canvas) return;
    pendingSaveSprite = config.canvas;
    pendingSaveConfig = config;

    const modal = document.getElementById('saveToGalleryModal');
    if (!modal) return;

    const titleEl = document.getElementById('saveToGalleryModalTitle');
    const descEl = document.getElementById('saveToGalleryModalDesc');
    const labelEl = document.getElementById('saveToGalleryNameLabel');
    const previewImg = document.getElementById('savePreviewImg');
    const nameInput = document.getElementById('flowerNameInput');

    if (titleEl) titleEl.textContent = config.title || 'Simpan ke Galeri';
    if (descEl) descEl.textContent = config.desc || 'Beri nama karyamu agar mudah ditemukan kembali';
    if (labelEl) labelEl.textContent = config.nameLabel || 'Nama:';
    if (previewImg) previewImg.src = config.canvas.toDataURL('image/png');
    if (nameInput) nameInput.value = config.defaultName || 'Karya Baru';

    modal.classList.remove('hidden');
    setTimeout(() => {
        if (nameInput) {
            nameInput.focus();
            nameInput.select();
        }
    }, 60);
}

function promptSaveToGallery() {
    const trimmed = extractTrimmedFlowerCanvas();
    if (!trimmed) {
        showGardenNotice('Silakan gambar bungamu di kanvas terlebih dahulu!');
        playErrorSound();
        return;
    }
    const flowerStrokes = (typeof window.getRecordedFlowerStrokes === 'function') 
        ? window.getRecordedFlowerStrokes() 
        : (typeof recordedFlowerStrokes !== 'undefined' ? recordedFlowerStrokes.slice() : []);

    openSaveToGalleryDialogWithConfig({
        category: 'flower',
        canvas: trimmed,
        defaultName: `Bunga Cantik #${galleryFlowers.length + 1}`,
        title: 'Simpan ke Galeri Bunga',
        desc: 'Beri nama cantik untuk bungamu agar mudah ditemukan kembali',
        nameLabel: 'Nama Bunga:',
        strokes: flowerStrokes
    });
}

function closeSaveToGalleryDialog() {
    const modal = document.getElementById('saveToGalleryModal');
    if (modal) modal.classList.add('hidden');
    pendingSaveSprite = null;
    pendingSaveConfig = null;
}

function confirmSaveToGallery() {
    if (!pendingSaveSprite) return;
    const nameInput = document.getElementById('flowerNameInput');
    const defaultName = (pendingSaveConfig && pendingSaveConfig.defaultName) ? pendingSaveConfig.defaultName : 'Karya Kebun';
    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : defaultName;
    const cat = (pendingSaveConfig && pendingSaveConfig.category) ? pendingSaveConfig.category : 'flower';
    const strokes = (pendingSaveConfig && pendingSaveConfig.strokes) ? pendingSaveConfig.strokes : [];
    const spriteDataUrl = pendingSaveSprite.toDataURL('image/png');

    if (cat === 'animal') {
        const newEntry = {
            id: 'fav_custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            name: name,
            type: 'custom',
            variant: 'custom',
            habitat: pendingSaveConfig.habitat || 'land',
            sound: pendingSaveConfig.sound || 'chime',
            spriteDataUrl: spriteDataUrl,
            strokes: strokes,
            createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        };
        galleryAnimals.unshift(newEntry);
        saveGalleryAnimalsToStorage();
        updateGalleryBadge();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`Hewan "${name}" berhasil disimpan ke Hewan Favorit! ⭐`);
        }
    } else if (cat === 'decor') {
        const newEntry = {
            id: 'fav_dec_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            type: 'custom_prop',
            name: name,
            isCustomProp: true,
            habitat: pendingSaveConfig.habitat || 'land',
            scale: pendingSaveConfig.scale || 1.0,
            spriteDataUrl: spriteDataUrl,
            strokes: strokes,
            createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        };
        galleryDecorations.unshift(newEntry);
        saveGalleryDecorationsToStorage();
        updateGalleryBadge();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`Dekorasi "${name}" berhasil disimpan ke Dekorasi Favorit! ⭐`);
        }
    } else {
        // flower
        const newEntry = {
            id: 'gal_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            name: name,
            dataUrl: spriteDataUrl,
            strokes: strokes,
            createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            width: pendingSaveSprite.width,
            height: pendingSaveSprite.height
        };
        galleryFlowers.unshift(newEntry);
        saveGalleryFlowersToStorage();
        updateGalleryBadge();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`Bunga "${name}" berhasil disimpan ke Galeri! 🌸`);
        }
    }

    closeSaveToGalleryDialog();
    if (typeof incrementStat === 'function') {
        incrementStat('customCreations', 1);
    }
    if (typeof playPlantSound === 'function') {
        playPlantSound();
    } else if (typeof playChimeSound === 'function') {
        playChimeSound();
    }
}

// Allow pressing Enter in flowerNameInput to save
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('flowerNameInput');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') confirmSaveToGallery();
        });
    }
});

function activatePlantingMode() {
    const trimmed = extractTrimmedFlowerCanvas();
    if (!trimmed) {
        showGardenNotice('Gambar bungamu di studio terlebih dahulu!');
        playErrorSound();
        return;
    }
    pendingFlowerSprite = trimmed;
    currentTool = 'plant';
    updateToolbarUI();
    document.getElementById('plantingBanner').classList.remove('hidden');
    worldCanvas.style.cursor = 'copy';
}

function exitPlantingMode() {
    document.getElementById('plantingBanner').classList.add('hidden');
    setWorldTool('hand');
}

// Global function bindings on window for robust HTML access
window.galleryFlowers = galleryFlowers;
window.galleryAnimals = galleryAnimals;
window.galleryDecorations = galleryDecorations;
window.initGallery = initGallery;
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
window.switchGalleryTab = switchGalleryTab;
window.renderGalleryGrid = renderGalleryGrid;
window.renderFlowersGrid = renderFlowersGrid;
window.renderAnimalsGrid = renderAnimalsGrid;
window.renderDecorationsGrid = renderDecorationsGrid;
window.isAnimalFavorited = isAnimalFavorited;
window.toggleFavoriteAnimal = toggleFavoriteAnimal;
window.toggleFavoriteAnimalById = toggleFavoriteAnimalById;
window.toggleFavoriteFollowedAnimal = toggleFavoriteFollowedAnimal;
window.summonAnimalFromGallery = summonAnimalFromGallery;
window.renameAnimalInGallery = renameAnimalInGallery;
window.deleteAnimalFromGallery = deleteAnimalFromGallery;
window.isDecorFavorited = isDecorFavorited;
window.toggleFavoriteDecor = toggleFavoriteDecor;
window.toggleFavoriteCatalogDecor = toggleFavoriteCatalogDecor;
window.toggleFavoriteActiveDecor = toggleFavoriteActiveDecor;
window.placeDecorFromGallery = placeDecorFromGallery;
window.loadPropIntoStudio = loadPropIntoStudio;
window.loadAnimalIntoStudio = loadAnimalIntoStudio;
window.renameDecorInGallery = renameDecorInGallery;
window.deleteDecorFromGallery = deleteDecorFromGallery;
window.playGalleryItemTimelapse = playGalleryItemTimelapse;
window.restartGalleryTimelapse = restartGalleryTimelapse;
window.closeGalleryTimelapseModal = closeGalleryTimelapseModal;
window.saveGalleryTimelapseVideo = saveGalleryTimelapseVideo;
window.plantFlowerFromGallery = plantFlowerFromGallery;
window.loadFlowerIntoStudio = loadFlowerIntoStudio;
window.renameFlowerInGallery = renameFlowerInGallery;
window.deleteFlowerFromGallery = deleteFlowerFromGallery;
window.promptSaveToGallery = promptSaveToGallery;
window.openSaveToGalleryDialogWithConfig = openSaveToGalleryDialogWithConfig;
window.closeSaveToGalleryDialog = closeSaveToGalleryDialog;
window.confirmSaveToGallery = confirmSaveToGallery;
window.activatePlantingMode = activatePlantingMode;
window.exitPlantingMode = exitPlantingMode;
window.renderExclusivePetsGrid = renderExclusivePetsGrid;
window.summonExclusivePetFromGallery = summonExclusivePetFromGallery;
window.focusExclusivePetInGarden = focusExclusivePetInGarden;
window.updateGalleryBadge = updateGalleryBadge;
