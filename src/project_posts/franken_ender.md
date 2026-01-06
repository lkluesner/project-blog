---
title: Franken-Ender
description: Rebuild of my old, orginial, Ender 3 3D printer. A complete structural overhaul from Cartesian to Core XY. Updated MCU software from stock to Klipper, an enclosure to print more tempermental filaments, and upgrades to the hotdend, extruder, and steppers.
date: 2025-12-04
tags: number 1
eleventyNavigation:
    key: Franken-Ender
    parent: Projects
---
An attempt to get my Ender 3 up to more modern 3d printing standards, similar to a Bambu labs or a Voron.


## Flashing Klipper and Bit-Banging

[Adafruit Avrdude RaspPi Guide](https://learn.adafruit.com/program-an-avr-or-arduino-using-raspberry-pi-gpio-pins/installation)

[Klipper Flashing Guide](https://www.klipper3d.org/Installation.html#building-and-flashing-the-micro-controller)

One of the features that my Ender 3 was greatly lacking was an auto-bed leveling sensor, so one of the first things I wanted to do was add one. 

<img class="blogImage" src="/images/frankenender/bitburn_pins.JPG" alt="">

To do that, I needed to flash new software to the printer mainboard. 

My old Ender 3 has an old 8-bit Melzi MCU board, that was running some old version of Marlin. However, the 8-bit microcontroller in this board is very outdated, so instead of flashing a new Marlin version that would run slowly on the 8-bits available, I decided to swap to Klipper.

Klipper lets you outsource the "thinking" part of your 3d printer to a Raspberry Pi. In my case, with a Pi 4, I now get a 64-bit quad core processor that can do much more than an 8-bit microcontroller. 

So, I started the process to flash Klipper onto my Ender 3.

<img class="blogImage" src="/images/frankenender/microcontrollers_AVR_Programmer_bb.jpg" alt="">

Unfortunately, the board shipped with the OG Ender 3 did not have a USB bootloader for new software installed. That meant I needed to directly connect to the programming pins of the microcontroller in order to flash new software (and a bootloader). 

They sell USB connectors for this task that run around 10 bucks, but I decided to cheap out and just use the GPIO pins on the Klipper Raspberry Pi. Bit-Banging!

I used Avrdude for this, an awesome open source utility for programming AVR microcontrollers. And after spending way too long plugging (and double checking) my Dupont jumpers into the Pi and MCU, I was able to flash the Klipper software. 

## Add Auto-Bed Leveling Sensor

Another lovely feature of the 8-bit Melzi MCU is the fact that there are no easy accessible (and free) GPIO pins to plug our new sensor into. We need 2 new signals from the MCU to control/utilize the ABL sensor, one to control the up and down, and one to poll the switch state.

<img class="blogImage" src="/images/frankenender/ezoutv2_display_jumper.jpg" alt="">

To get one of these valuable I/O pins we will remove the Z-stop switch as the ABL switch is our Z-stop now. 

To get the other, we will install a jumper to steal the pin that controls the buzzer on the display.

Luckily I'm not the first to do this, so was able to pick one up online for 3 bucks at TH3D.

<img class="blogImage" src="/images/frankenender/crtouch_pinout.jpeg" alt="">

I chose the CR Touch as my ABL, I bought this early in the project, and I regret it. Its not a bad sensor, it just is outdated and heavy compared to KlickyPCB or BDSensor.

I then spliced the CR touch cable to 2 connectors, one going to the z stop, the other going to the display jumper.

With the power of Klipper (and a bit of configuration), my ancient Ender 3 can now: auto-bed level AND use bed meshes!

## One Last Ride/Self Replication

Now that we have done some minor upgrades, It was time for my Old Ender to start printing its replacement. Or is it printing organs to prolong its life? Real ship of Theseus situation I got going on here.

<img class="blogImage" src="/images/frankenender/ender3_in_tent.JPG" alt="">

In order to print ABS we need some sort of enclosure. I started out with a sketchy cardboard contraption setup in my parents garage, that actually was semi-functional... But, I decided to be a good son, and not burn down my parents house so I shelled out 20 bucks for a 3d printer tent.

<img class="blogImage" src="/images/frankenender/ender3_wire_extensions.JPG" alt="">

I extended the wires of the stock Ender 3 Harness so I could move the electronics out of the hot enclosure.

<img class="blogImage" src="/images/frankenender/tent_mcu.JPG" alt="">

I also added lights in the tent..

<img class="blogImage" src="/images/frankenender/tent_light.JPG" alt="">

...and a camera so I could babysit prints from long distance.

<img class="blogImage" src="/images/frankenender/tent_cam.JPG" alt="">

Side Note: I used Tailscale to setup secure communication to the RaspPi, mainly because it was the lowest effort.

<img class="blogImage" src="/images/frankenender/tent_pi.JPG" alt="">

Because I was printing in my parents garage, I also wanted a filament dry box to keep my new ASA filament fresh. I built a design I found online, the [Ultimate Filament Dry Box](https://www.printables.com/model/453772-ultimate-filament-dry-box).

<img class="blogImage" src="/images/frankenender/drybox.JPG" alt="">

## Woodworking and the Enclosure

## Assembly

## Testing
