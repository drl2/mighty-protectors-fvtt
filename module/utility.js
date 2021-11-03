/* Support functions */

/**
 * Condenses complex roll formulas down to a simpler form
 * Example:  "1d6+5+1d4+1d6+2"  ==> 1d4+2d6+7
 * @param {string} rollText 
 * @returns 
 */
export function simplifyDice(rollText) {
    const diceRE = /(?=[+-])/
    let finalAdj = 0;
    let dice = '';
    let rollsByDie = [];
    let rolls = rollText.split(diceRE);
    let simplifiedRoll = '';

    rolls.forEach(section => {
        section = section.replace('+', '');
        dice = section.split('d');

        if (dice.length == 1) {
            finalAdj = finalAdj + parseInt(dice[0], 10);
        } else {
            let idx = rollsByDie.findIndex((item) => item.dieSize === dice[1]);
            if (idx == -1) {
                rollsByDie.push({ dieCount: parseInt(dice[0], 10) || 1, dieSize: dice[1] });
            } else {
                rollsByDie[idx].dieCount += (parseInt(dice[0], 10) || 1);
            }
        }
    });

    // sort it by die size
    rollsByDie.sort(function (a, b) {
        return parseInt(a.dieSize, 10) - parseInt(b.dieSize, 10);
    })

    rollsByDie.forEach(dieRoll => {
        if (dieRoll.dieCount != 0) {
            simplifiedRoll += ((simplifiedRoll.length > 0 && dieRoll.dieCount > 0) ? '+' : '') + dieRoll.dieCount + 'd' + dieRoll.dieSize;
        }
    })
    if (finalAdj != 0) {
        simplifiedRoll += ((finalAdj > 0) ? '+' : '') + finalAdj;
    }

    return simplifiedRoll;
}



/**
 * Task checks in MP are all d20 based with lower = better.  Switch around the normal min/max where possible
 * @param {string} dieRoll 
 */
export function rollMinMax(dieRoll) {
    let result = "";
    if (dieRoll == 20) result = "min";
    if (dieRoll == 1) result = "max";
    return result;
}
