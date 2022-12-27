export const MP = {};

MP.AttributeTypes = {
    AG: "BC.Agility.fullname",
    IN: "BC.Intelligence.fullname",
    CL: "BC.Cool.fullname"
};

MP.ItemTypeImages = {
    ability: "systems/mighty-protectors/assets/icons/ability.webp",
    attack: "systems/mighty-protectors/assets/icons/attack.webp",
    protection: "systems/mighty-protectors/assets/icons/protection.webp",
    movement: "systems/mighty-protectors/assets/icons/movement.webp",
    background: "systems/mighty-protectors/assets/icons/background.webp",
    vehiclesystem: "systems/mighty-protectors/assets/icons/gears.webp",
    vehicleattack: "systems/mighty-protectors/assets/icons/missile-pod.webp"
};

MP.ActorTypeImages = {
    character: "systems/mighty-protectors/assets/icons/character.webp",
    npc: "systems/mighty-protectors/assets/icons/character.webp",
    vehicle: "systems/mighty-protectors/assets/icons/vehicle.webp",
};

MP.DamageTypes = {
    kinetic: "DAMAGE.Kinetic",
    bio: "DAMAGE.Bio",
    energy: "DAMAGE.Energy",
    entropy: "DAMAGE.Entropy",
    psychic: "DAMAGE.Psychic",
    other: "DAMAGE.Other"
};

MP.HealTimes = {
    days: "MP.HealTimes.Days",
    hours: "MP.HealTimes.Hours",
    minutes: "MP.HealTimes.Minutes"
};

MP.MoveRateTypes = {
    constant: "MP.MoveRateTypes.Constant",
    accelmax: "MP.MoveRateTypes.Acceleration"
};

MP.MoveRateFormulas = {
    manual: "MP.MovementFormulas.Manual",
    ground: "MP.MovementFormulas.Ground",
    leaping: "MP.MovementFormulas.Leaping"
};

MP.StatTable = [
    {min: 0, max: 0, carry: 8, hth_init: 'd2-1', save: 6, hits_st: -3, hits_en: -5, hits_ag: -2, hits_cl: -1, heal: .2},
    {min: 1, max: 1, carry: 10, hth_init: 'd2-1', save: 7, hits_st: -3, hits_en: -5, hits_ag: -2, hits_cl: -1, heal: .3},
    {min: 2, max: 2, carry: 12, hth_init: 'd2-1', save: 7, hits_st: -3, hits_en: -5, hits_ag: -2, hits_cl: -1, heal: .3},
    {min: 3, max: 5, carry: 15, hth_init: 'd2', save: 8, hits_st: -2, hits_en: -3, hits_ag: -1, hits_cl: -0, heal: .5},
    {min: 6, max: 8, carry: 30, hth_init: 'd3', save: 9,  hits_st: 0, hits_en: -1, hits_ag: 0, hits_cl: 1, heal: .8},
    {min: 9, max: 11, carry: 60, hth_init: 'd4', save: 10, hits_st: 1, hits_en: 1, hits_ag: 1, hits_cl: 1, heal: 1},
    {min: 12, max: 14, carry: 120, hth_init: 'd6', save: 11, hits_st: 3, hits_en: 3, hits_ag: 2, hits_cl: 2, heal: 1.6},
    {min: 15, max: 17, carry: 240, hth_init: 'd6+1', save: 11, hits_st: 5, hits_en: 6, hits_ag: 3, hits_cl: 2, heal: 2.2},
    {min: 18, max: 20, carry: 480, hth_init: 'd8+1', save: 12, hits_st: 6, hits_en: 8, hits_ag: 5, hits_cl: 3, heal: 2.8},
    {min: 21, max: 23, carry: 960, hth_init: 'd10+1', save: 12, hits_st: 8, hits_en: 10, hits_ag: 6, hits_cl: 3, heal: 3.4},
    {min: 24, max: 26, carry: 1920, hth_init: '2d6', save: 13, hits_st: 10, hits_en: 13, hits_ag: 7, hits_cl: 5, heal: 3.9},
    {min: 27, max: 29, carry: 3840, hth_init: 'd6+d8', save: 13, hits_st: 12, hits_en: 15, hits_ag: 8, hits_cl: 5, heal: 4.5},
    {min: 30, max: 32, carry: 7680, hth_init: '2d8', save: 14, hits_st: 14, hits_en: 17, hits_ag: 9, hits_cl: 5, heal: 5.1},
    {min: 33, max: 35, carry: 15360, hth_init: 'd8+d10', save: 14, hits_st: 16, hits_en: 20, hits_ag: 10, hits_cl: 6, heal: 5.7},
    {min: 36, max: 38, carry: 30720, hth_init: '2d10', save: 15, hits_st: 17, hits_en: 22, hits_ag: 12, hits_cl: 6, heal: 6.3},
    {min: 39, max: 41, carry: 61440, hth_init: 'd10+d12', save: 15, hits_st: 19, hits_en: 25, hits_ag: 13, hits_cl: 7, heal: 6.9},
    {min: 42, max: 44, carry: 122880, hth_init: '2d12', save: 16, hits_st: 21, hits_en: 27, hits_ag: 14, hits_cl: 7, heal: 7.5},
    {min: 45, max: 47, carry: 245760, hth_init: '3d8', save: 16, hits_st: 23, hits_en: 29, hits_ag: 15, hits_cl: 8, heal: 8.1},
    {min: 48, max: 50, carry: 491520, hth_init: '2d8+d10', save: 17, hits_st: 25, hits_en: 32, hits_ag: 16, hits_cl: 9, heal: 8.7},
    {min: 51, max: 53, carry: 983040, hth_init: 'd8+2d10', save: 17, hits_st: 27, hits_en: 34, hits_ag: 17, hits_cl: 9, heal: 9.2},
    {min: 54, max: 56, carry: 1966080, hth_init: '3d10', save: 18, hits_st: 28, hits_en: 36, hits_ag: 19, hits_cl: 10, heal: 9.8},
    {min: 57, max: 59, carry: 3932160, hth_init: '2d10+d12', save: 18, hits_st: 30, hits_en: 39, hits_ag: 20, hits_cl: 10, heal: 10.4},
    {min: 60, max: 62, carry: 7864320, hth_init: 'd10+2d12', save: 19, hits_st: 32, hits_en: 41, hits_ag: 21, hits_cl: 11, heal: 11},
    {min: 63, max: 65, carry: 15728640, hth_init: '3d12', save: 19, hits_st: 34, hits_en: 43, hits_ag: 22, hits_cl: 12, heal: 11.6},
    {min: 66, max: 68, carry: 31457280, hth_init: '3d12+1', save: 20, hits_st: 36, hits_en: 46, hits_ag: 23, hits_cl: 12, heal: 12.2},
    {min: 69, max: 71, carry: 62914560, hth_init: '3d12+2', save: 20, hits_st: 38, hits_en: 48, hits_ag: 25, hits_cl: 13, heal: 12.8},
    {min: 72, max: 74, carry: 125829120, hth_init: '4d10', save: 21, hits_st: 39, hits_en: 50, hits_ag: 26, hits_cl: 13, heal: 13.4},
    {min: 75, max: 77, carry: 251658240, hth_init: '3d10+d12', save: 21, hits_st: 41, hits_en: 53, hits_ag: 27, hits_cl: 14, heal: 14},
    {min: 78, max: 80, carry: 503316480, hth_init: '2d10+2d12', save: 22, hits_st: 43, hits_en: 55, hits_ag: 28, hits_cl: 15, heal: 14.5},
    {min: 81, max: 83, carry: 1006632960, hth_init: 'd10+3d12', save: 22, hits_st: 45, hits_en: 58, hits_ag: 29, hits_cl: 15, heal: 15.1},
    {min: 84, max: 86, carry: 2013265920, hth_init: '4d12', save: 23, hits_st: 47, hits_en: 60, hits_ag: 30, hits_cl: 16, heal: 15.7},
    {min: 87, max: 89, carry: 4026531840, hth_init: '4d12+1', save: 23, hits_st: 48, hits_en: 62, hits_ag: 32, hits_cl: 16, heal: 16.3},
    {min: 90, max: 92, carry: 8053063680, hth_init: '5d10', save: 24, hits_st: 50, hits_en: 65, hits_ag: 33, hits_cl: 17, heal: 16.9},
    {min: 93, max: 95, carry: 16106127360, hth_init: '4d10+d12', save: 24, hits_st: 52, hits_en: 67, hits_ag: 34, hits_cl: 17, heal: 17.5},
    {min: 96, max: 98, carry: 32212254720, hth_init: '3d10+2d12', save: 25, hits_st: 54, hits_en: 69, hits_ag: 35, hits_cl: 18, heal: 18.1}
];

MP.VehicleTable = [
    {cps: 0, spaces: 2, weight: 360, mass: 'd6', profile: 1.41, st: 15, en: 15, hits: 13},
    {cps: 2.5, spaces: 3, weight: 540, mass: 'd6+1', profile: 1.705, st: 16, en: 17, hits: 15},
    {cps: 5, spaces: 4, weight: 720, mass: 'd6+1', profile: 2, st: 18, en: 18, hits: 16},
    {cps: 7.5, spaces: 6, weight: 1080, mass: 'd8+1', profile: 2.415, st: 19, en: 20, hits: 18},
    {cps: 10, spaces: 8, weight: 1440, mass: 'd8+1', profile: 2.83, st: 21, en: 21, hits: 20},
    {cps: 12.5, spaces: 12, weight: 2160, mass: 'd10+1', profile: 3.415, st: 22, en: 23, hits: 23},    
    {cps: 15, spaces: 16, weight: 2880, mass: 'd10+1', profile: 4, st: 24, en: 24, hits: 25},
    {cps: 17.5, spaces: 24, weight: 4320, mass: '2d6', profile: 4.83, st: 25, en: 26, hits: 27},
    {cps: 20, spaces: 32, weight: 5760, mass: '2d6', profile: 5.66, st: 27, en: 27, hits: 29},    
    {cps: 22.5, spaces: 48, weight: 8640, mass: 'd6+d8', profile: 6.83, st: 28, en: 29, hits: 31},
    {cps: 25, spaces: 64, weight: 11520, mass: 'd6+d8', profile: 8, st: 30, en: 30, hits: 33},
    {cps: 27.5, spaces: 96, weight: 17280, mass: '2d8', profile: 9.655, st: 31, en: 32, hits: 36},    
    {cps: 30, spaces: 128, weight: 23040, mass: '2d8', profile: 11.31, st: 33, en: 33, hits: 38},
    {cps: 32.5, spaces: 192, weight: 34560, mass: 'd8+d10', profile: 13.655, st: 34, en: 35, hits: 40},
    {cps: 35, spaces: 256, weight: 46080, mass: 'd8+d10', profile: 16, st: 36, en: 36, hits: 41},    
    {cps: 37.5, spaces: 384, weight: 69120, mass: '2d10', profile: 19.315, st: 37, en: 38, hits: 44},
    {cps: 40, spaces: 512, weight: 92160, mass: '2d10', profile: 22.63, st: 39, en: 39, hits: 46},
    {cps: 42.5, spaces: 768, weight: 138240, mass: 'd10+d12', profile: 27.315, st: 40, en: 41, hits: 48},    
    {cps: 45, spaces: 1024, weight: 184320, mass: 'd10+d12', profile: 32, st: 42, en: 42, hits: 50},
    {cps: 47.5, spaces: 1536, weight: 276480, mass: '2d12', profile: 38.625, st: 43, en: 44, hits: 52},
    {cps: 50, spaces: 2048, weight: 368640, mass: '2d12', profile: 45.25, st: 45, en: 45, hits: 54},    
    {cps: 52.5, spaces: 3072, weight: 552960, mass: '3d8', profile: 54.625, st: 46, en: 47, hits: 57},
    {cps: 55, spaces: 4096, weight: 737280, mass: '3d8', profile: 64, st: 48, en: 48, hits: 59},
    {cps: 57.5, spaces: 6144, weight: 1105920, mass: '2d8+d10', profile: 77.255, st: 49, en: 50, hits: 61},    
    {cps: 60, spaces: 8192, weight: 1474560, mass: '2d8+d10', profile: 90.51, st: 51, en: 51, hits: 63},
    {cps: 62.5, spaces: 12288, weight: 2211840, mass: 'd8+2d10', profile: 109.255, st: 52, en: 53, hits: 65},
    {cps: 65, spaces: 16384, weight: 2949120, mass: 'd8+2d10', profile: 128, st: 54, en: 54, hits: 66},    
    {cps: 67.5, spaces: 24576, weight: 4423680, mass: '3d10', profile: 154.51, st: 55, en: 56, hits: 69},
    {cps: 70, spaces: 32768, weight: 5898240, mass: '3d10', profile: 181.02, st: 57, en: 57, hits: 71},
    {cps: 72.5, spaces: 49152, weight: 8847360, mass: '2d10+d12', profile: 218.51, st: 58, en: 59, hits: 73},    
    {cps: 75, spaces: 65536, weight: 11796480, mass: '2d10+d12', profile: 256, st: 60, en: 60, hits: 75},
    {cps: 77.5, spaces: 98304, weight: 17694720, mass: 'd10+2d12', profile: 309.017, st: 61, en: 62, hits: 77},
    {cps: 80, spaces: 131072, weight: 23592960, mass: 'd10+2d12', profile: 362.034, st: 63, en: 63, hits: 79},    
    {cps: 82.5, spaces: 196608, weight: 35389440, mass: '3d12', profile: 437.017, st: 64, en: 65, hits: 82},
    {cps: 85, spaces: 262144, weight: 47185920, mass: '3d12', profile: 512, st: 66, en: 66, hits: 84},
    {cps: 87.5, spaces: 393216, weight: 70778880, mass: '3d12+1', profile: 618.04, st: 67, en: 68, hits: 86},    
    {cps: 90, spaces: 524288, weight: 94371840, mass: '3d12+1', profile: 724.08, st: 69, en: 69, hits: 88},
    {cps: 92.5, spaces: 786432, weight: 141577760, mass: '3d12+2', profile: 874.04, st: 70, en: 71, hits: 90},
    {cps: 95, spaces: 1048576, weight: 188743680, mass: '3d12+2', profile: 1024, st: 72, en: 72, hits: 91},    
    {cps: 97.5, spaces: 1572864, weight: 283115520, mass: '4d10', profile: 1236.075, st: 73, en: 74, hits: 94},
    {cps: 100, spaces: 2097152, weight: 377487360, mass: '4d10', profile: 1448.15, st: 75, en: 75, hits: 96},
    {cps: 102.5, spaces: 3145728, weight: 566231040, mass: '3d10+d12', profile: 1748.075, st: 76, en: 77, hits: 98},    
    {cps: 105, spaces: 4194304, weight: 754974720, mass: '3d10+d12', profile: 2048, st: 78, en: 78, hits: 100},
    {cps: 107.5, spaces: 6291456, weight: 1132462080, mass: ' 2d10+2d12', profile: 2472.155, st: 79, en: 80, hits: 103},
    {cps: 110, spaces: 8388608, weight: 1509949440, mass: ' 2d10+2d12', profile: 2896.31, st: 81, en: 81, hits: 105},    
    {cps: 112.5, spaces: 12582912, weight: 2264924160, mass: 'd10+3d12', profile: 3496.155, st: 82, en: 83, hits: 107},
    {cps: 115, spaces: 16777216, weight: 3019898880, mass: 'd10+3d12', profile: 40961, st: 84, en: 84, hits: 109},
    {cps: 117.5, spaces: 25165824, weight: 4529848320, mass: '4d12', profile: 4944.31, st: 85, en: 86, hits: 111},    
    {cps: 120, spaces: 33554432, weight: 6039979760, mass: '4d12', profile: 5792.62, st: 87, en: 87, hits: 112},
    {cps: 122.5, spaces: 50331648, weight: 9059696640, mass: '4d12+1', profile: 6992.31, st: 88, en: 89, hits: 115},
    {cps: 125, spaces: 67108864, weight: 12079595520, mass: '4d12+1', profile: 8192, st: 90, en: 90, hits: 117},
    {cps: 127.5, spaces: 100663296, weight: 18119393280, mass: '5d10', profile: 9888.62, st: 91, en: 92, hits: 119},    
    {cps: 130, spaces: 134217728, weight: 24159191040, mass: '5d10', profile: 11585.24, st: 93, en: 93, hits: 121},
    {cps: 132.5, spaces: 201326592, weight: 36238786560, mass: '4d10+d12', profile: 14188.96, st: 94, en: 95, hits: 123},
    {cps: 135, spaces: 268435456, weight: 48318382080, mass: '4d10+d12', profile: 16384, st: 96, en: 96, hits: 125},
    {cps: 137.5, spaces: 402653184, weight: 72477573120, mass: '3d10+2d12', profile: 20066.22, st: 97, en: 98, hits: 127},
    {cps: 140, spaces: 526870912, weight: 96636764160, mass: '3d10+2d12', profile: 23170.475, st: 99, en: 99, hits: 129}
];

MP.VehicleSystemsTable = [
    {spaces: 1, profile: 1, hits: 8, cps: 5},
    {spaces: 2, profile: 1.41, hits: 13, cps: 10},
    {spaces: 3, profile: 1.705, hits: 15, cps: 12.5},
    {spaces: 4, profile: 2, hits: 16, cps: 15},
    {spaces: 6, profile: 2.415, hits: 18, cps: 17.5},
    {spaces: 8, profile: 2.83, hits: 20, cps: 20},
    {spaces: 12, profile: 3.415, hits: 23, cps: 22.5},
    {spaces: 16, profile: 4, hits: 25, cps: 25},
    {spaces: 24, profile: 4.83, hits: 27, cps: 27.5},
    {spaces: 32, profile: 5.66, hits: 29, cps: 30},
    {spaces: 48, profile: 6.83, hits: 31, cps: 32.5},
    {spaces: 64, profile: 8, hits: 33, cps: 35},
    {spaces: 96, profile: 9.655, hits: 36, cps: 37.5},
    {spaces: 128, profile: 11.31, hits: 38, cps: 40},
    {spaces: 192, profile: 13.655, hits: 40, cps: 42.5},
    {spaces: 256, profile: 16, hits: 41, cps: 45},
    {spaces: 384, profile: 19.315, hits: 44, cps: 47.5},
    {spaces: 512, profile: 22.63, hits: 46, cps: 505},
    {spaces: 768, profile: 27.315, hits: 48, cps: 52.5},
    {spaces: 1024, profile: 32, hits: 50, cps: 55},
    {spaces: 1536, profile: 38.625, hits: 52, cps: 57.5},
    {spaces: 2048, profile: 45.25, hits: 54, cps: 60},
    {spaces: 3072, profile: 54.625, hits: 57, cps: 62.5},
    {spaces: 4096, profile: 64, hits: 59, cps: 65},
    {spaces: 6144, profile: 77.255, hits: 61, cps: 67.5},
    {spaces: 8192, profile: 90.51, hits: 63, cps: 70},
    {spaces: 12288, profile: 109.255, hits: 65, cps: 72.5},
    {spaces: 16384, profile: 128, hits: 66, cps: 75},
    {spaces: 24576, profile: 154.51, hits: 69, cps: 77.5},
    {spaces: 32768, profile: 181.02, hits: 71, cps: 80},
    {spaces: 49152, profile: 218.51, hits: 73, cps: 82.5},
    {spaces: 65536, profile: 256, hits: 75, cps: 85},
    {spaces: 98304, profile: 309.017, hits: 77, cps: 87.5},
    {spaces: 131072, profile: 362.034, hits: 79, cps: 90},
    {spaces: 196608, profile: 437.017, hits: 82, cps: 92.5},
    {spaces: 262144, profile: 512, hits: 84, cps: 95},
    {spaces: 393216, profile: 618.04, hits: 86, cps: 97.5},
    {spaces: 524288, profile: 724.08, hits: 88, cps: 100}
];
