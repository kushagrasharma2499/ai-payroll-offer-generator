function calculatePayroll(ctc){

    ctc = Number(ctc)
    
    const basic = ctc * 0.40
    const hra = basic * 0.50
    const conveyance = 1600 * 12
    const bonus = ctc * 0.10
    
    const special = ctc - (basic + hra + conveyance + bonus)
    
    const gross = basic + hra + conveyance + special
    
    const pf = basic * 0.12
    const esi = gross * 0.0075
    const pt = 2400
    
    const deductions = pf + esi + pt
    
    const net = gross - deductions
    
    return {
    
    basic,
    hra,
    conveyance,
    special,
    gross,
    pf,
    esi,
    pt,
    deductions,
    net
    
    }
    
    }
    
    module.exports = calculatePayroll