export const MP = {};

MP.AttributeTypes = {
    AG: "BC.Agility.fullname",
    IN: "BC.Intelligence.fullname",
    CL: "BC.Cool.fullname"
}

MP.ItemTypeImages = {
    ability: "systems/mighty-protectors/assets/icons/ability.webp",
    attack: "systems/mighty-protectors/assets/icons/attack.webp",
    protection: "systems/mighty-protectors/assets/icons/protection.webp",
    movement: "systems/mighty-protectors/assets/icons/movement.webp",
    background: "systems/mighty-protectors/assets/icons/background.webp"
}

MP.ActorTypeImages = {
    character: "systems/mighty-protectors/assets/icons/character.webp",
    npc: "systems/mighty-protectors/assets/icons/character.webp",
    vehicle: "systems/mighty-protectors/assets/icons/vehicle.webp",
}

MP.DamageTypes = {
    sharpkinetic: "DAMAGE.SharpKinetic",
    bluntkinetic: "DAMAGE.BluntKinetic",
    bio: "DAMAGE.Bio",
    energy: "DAMAGE.Energy",
    entropy: "DAMAGE.Entropy",
    psychic: "DAMAGE.Psychic",
    other: "DAMAGE.Other"
}

MP.MoveRateTypes = {
    constant: "MP.MoveRateTypes.Constant",
    accelmax: "MP.MoveRateTypes.Acceleration"
}

MP.MoveRateFormulas = {
    manual: "MP.MovementFormulas.Manual",
    ground: "MP.MovementFormulas.Ground",
    leaping: "MP.MovementFormulas.Leaping"
}

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

