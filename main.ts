datalogger.onLogFull(function () {
    log_indicator = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
radio.onReceivedValue(function (name, value) {
    let log_control = 0
    let angle_signal = 0
    if (name == angle_signal) {
        let _4digit: grove.TM1637 = null
        if (log_indicator) {
            datalogger.log(datalogger.createCV("Angle Value - Actuator 2", value))
            led.toggle(4, 4)
        }
        _4digit.show(value)
    }
    if (name == log_control) {
        if (value == 1) {
            log_indicator = true
            basic.showIcon(IconNames.Yes)
        } else {
            log_indicator = false
            basic.showIcon(IconNames.No)
        }
    }
})
let log_indicator = false
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
timeanddate.set24HourTime(0, 0, 0)
radio.setGroup(100)
let display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
log_indicator = false
datalogger.log(datalogger.createCV("Angle Value - Actuator 2", 0))
basic.showIcon(IconNames.No)
basic.forever(function () {
	
})
