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
input.onButtonPressed(Button.A, function () {
    radio.sendValue(log_control, 1)
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue(log_control, 2)
    basic.showIcon(IconNames.No)
})
radio.onReceivedValue(function (name, value) {
    if (name == angle_signal) {
        if (log_indicator) {
            datalogger.log(datalogger.createCV("Angle Value - Actuator 2", value))
            led.toggle(4, 4)
        }
        display.show(value)
    }
    if (name == log_control) {
        if (value == 1) {
            log_indicator = true
            timeanddate.set24HourTime(0, 0, 0)
            basic.showIcon(IconNames.Yes)
        } else if (value == 2) {
            log_indicator = false
            basic.showIcon(IconNames.No)
        } else {
        	
        }
    }
})
let angle_signal = ""
let log_control = ""
let log_indicator = false
let display: grove.TM1637 = null
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
timeanddate.set24HourTime(0, 0, 0)
radio.setGroup(100)
display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
log_indicator = false
datalogger.log(datalogger.createCV("Angle Value - Actuator 2", 0))
basic.showIcon(IconNames.No)
basic.forever(function () {
    radio.sendValue(angle_signal, pins.map(
    0,
    0,
    1023,
    0,
    180
    ))
})
