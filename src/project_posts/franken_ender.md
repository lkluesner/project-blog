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

[Avrdude w/ RaspPi](https://learn.adafruit.com/program-an-avr-or-arduino-using-raspberry-pi-gpio-pins/installation) | [Klipper Flashing](https://www.klipper3d.org/Installation.html#building-and-flashing-the-micro-controller)

One of the features that my Ender 3 was greatly lacking was an auto-bed leveling sensor, so one of the first things I wanted to do was add one. 

<img class="blogImage medium" src="/images/frankenender/bitburn_pins.JPG" alt="" onclick="toggleFullScreen(this)">

To do that, I needed to flash new software to the printer mainboard. 

My old Ender 3 has an old 8-bit Melzi MCU board, that was running some old version of Marlin. However, the 8-bit microcontroller in this board is very outdated, so instead of flashing a new Marlin version that would run slowly on the 8-bits available, I decided to swap to Klipper.

Klipper lets you outsource the "thinking" part of your 3d printer to a Raspberry Pi. In my case, with a Pi 4, I now get a 64-bit quad core processor that can do much more than an 8-bit microcontroller. 

So, I started the process to flash Klipper onto my Ender 3.

<img class="blogImage medium" src="/images/frankenender/microcontrollers_AVR_Programmer_bb.jpg" alt="" onclick="toggleFullScreen(this)">

Unfortunately, the board shipped with the OG Ender 3 did not have a USB bootloader for new software installed. That meant I needed to directly connect to the programming pins of the microcontroller in order to flash new software (and a bootloader). 

They sell USB connectors for this task that run around 10 bucks, but I decided to cheap out and just use the GPIO pins on the Klipper Raspberry Pi. Bit-Banging!

I used Avrdude for this, an awesome open source utility for programming AVR microcontrollers. And after spending way too long plugging (and double checking) my Dupont jumpers into the Pi and MCU, I was able to flash the Klipper software. 

## Add Auto-Bed Leveling Sensor

Another lovely feature of the 8-bit Melzi MCU is the fact that there are no easy accessible (and free) GPIO pins to plug our new sensor into. We need 2 new signals from the MCU to control/utilize the ABL sensor, one to control the up and down, and one to poll the switch state.

<img class="blogImage tiny" src="/images/frankenender/ezoutv2_display_jumper.jpg" alt="" onclick="toggleFullScreen(this)">

To get one of these valuable I/O pins we will remove the Z-stop switch as the ABL switch is our Z-stop now. 

To get the other, we will install a jumper to steal the pin that controls the buzzer on the display.

Luckily I'm not the first to do this, so was able to pick one up online for 3 bucks at TH3D.

<img class="blogImage medium" src="/images/frankenender/crtouch_pinout.jpeg" alt="" onclick="toggleFullScreen(this)">

I chose the CR Touch as my ABL, I bought this early in the project, and I regret it. Its not a bad sensor, it just is outdated and heavy compared to KlickyPCB or BDSensor.

I then spliced the CR touch cable to 2 connectors, one going to the z stop, the other going to the display jumper.

With the power of Klipper (and a bit of configuration), my ancient Ender 3 can now: auto-bed level AND use bed meshes!

## One Last Ride/Self Replication

Now that we have done some minor upgrades, It was time for my Old Ender to start printing its replacement. Or is it printing organs to prolong its life? Real ship of Theseus situation I got going on here.

<img class="blogImage medium" src="/images/frankenender/ender3_in_tent.JPG" alt="" onclick="toggleFullScreen(this)">

In order to print ABS we need some sort of enclosure. I started out with a sketchy cardboard contraption setup in my parents garage, that actually was semi-functional... But, I decided to be a good son, and not burn down my parents house so I shelled out 20 bucks for a 3d printer tent.

<img class="blogImage medium" src="/images/frankenender/ender3_wire_extensions.JPG" alt="" onclick="toggleFullScreen(this)">

I extended the wires of the stock Ender 3 Harness so I could move the electronics out of the hot enclosure.

<img class="blogImage medium" src="/images/frankenender/tent_mcu.JPG" alt="" onclick="toggleFullScreen(this)">

I also added lights in the tent..

<img class="blogImage small" src="/images/frankenender/tent_light.JPG" alt="" onclick="toggleFullScreen(this)">

...and a camera so I could babysit prints from long distance.

<img class="blogImage small" src="/images/frankenender/tent_cam.JPG" alt="" onclick="toggleFullScreen(this)">

Side Note: I used Tailscale to setup secure communication to the RaspPi, mainly because it was the lowest effort.

<img class="blogImage small" src="/images/frankenender/tent_pi.JPG" alt="" onclick="toggleFullScreen(this)">

Because I was printing in my parents garage, I also wanted a filament dry box to keep my new ASA filament fresh. I built a design I found online, the [Ultimate Filament Dry Box](https://www.printables.com/model/453772-ultimate-filament-dry-box).

<img class="blogImage medium" src="/images/frankenender/drybox.JPG" alt="" onclick="toggleFullScreen(this)">

After all this was setup, I printed all the needed parts to build my [Ender NG](https://www.printables.com/model/922401-ender-3-ng-v12-corexy-conversion/files?lang=en) 

<img class="blogImage medium" src="/images/frankenender/bucket_of_parts.JPG" alt="" onclick="toggleFullScreen(this)">

## Woodworking and the Enclosure

The Ender NG project has plans for you to buy laser cut acrylic panels to use as an enclosure. As I am a cheap-ass, I will use my favorite material, that I have used for countless previous projects... Scrap wood from my Dad's garage! Free! (for me at least)

I found a few dirty pieces of quarter inch, MDF-core, plywood that were used for god knows what in the past. Absolute perfection.

<img class="blogImage medium" src="/images/frankenender/sanding_panels.JPG" alt="" onclick="toggleFullScreen(this)">

I used Autodesk Fusion 360 and the provided CAD files to get the needed measurements. Insert a montage here of me: cutting plywood on the table saw, drilling holes on the drill press, and sanding with the orbital sander.

<img class="blogImage medium" src="/images/frankenender/oiliing_panels.JPG" alt="" onclick="toggleFullScreen(this)">

After throwing a coat of tung oil on these panels they don't even look like scrap wood anymore! I probably should have thrown a second (or third) coat of finish on these but I was feeling lazy and called it good enough.

<img class="blogImage medium" src="/images/frankenender/franken_logo_panel.JPG" alt="" onclick="toggleFullScreen(this)">

For the back panel I wanted a to add a custom logo I created in Inkscape. The idea I had was to merge the old Ender 3 logo and a Frankenstein theme. Franken-Ender.

I used a water-slide decal, an inkjet office printer, and clear gloss spray paint to apply this logo.

First I finished the panel with tung oil. After a few days to cure, I hit it with a few coats of clear-coat (spray paint). I also then sealed the printer ink on the decal, with the same spray paint. After both of these dried, I applied the water slide decal, and sealed it with more clear-coat. I then alternated steel wool and clear-coat until you could (almost) no longer see the sticker outline.

## Assembly

The assembly of the Ender NG project was not very easy. It is very obvious that it was not designed with "ease of assembly" in mind. That is okay, as its goal was not to be easy, but to repurpuse.

Here are a bunch of pictures of the assembly process

<img class="blogImage medium" src="/images/frankenender/ender3_parts.JPG" alt="" onclick="toggleFullScreen(this)">

First i disassembled my ender 3 to harvest its organs. 

<img class="blogImage medium" src="/images/frankenender/screws.JPG" alt="" onclick="toggleFullScreen(this)">

Then I gathered my parts and started assembly

<img class="blogImage medium" src="/images/frankenender/assembly_sherpa.JPG" alt="" onclick="toggleFullScreen(this)">

Extruder assembly [Sherpa Mini](https://github.com/Annex-Engineering/Sherpa_Mini-Extruder)

<img class="blogImage medium" src="/images/frankenender/assembly1.JPG" alt="" onclick="toggleFullScreen(this)">

<img class="blogImage medium" src="/images/frankenender/assembly2.JPG" alt="" onclick="toggleFullScreen(this)">

<img class="blogImage medium" src="/images/frankenender/assembly3.JPG" alt="" onclick="toggleFullScreen(this)">

<img class="blogImage medium" src="/images/frankenender/assembly4.JPG" alt="" onclick="toggleFullScreen(this)">

<img class="blogImage medium" src="/images/frankenender/assembly5.JPG" alt="" onclick="toggleFullScreen(this)">

<img class="blogImage medium" src="/images/frankenender/assembly6.JPG" alt="" onclick="toggleFullScreen(this)">

<img class="blogImage medium" src="/images/frankenender/assembly7.JPG" alt="" onclick="toggleFullScreen(this)">

<img class="blogImage medium" src="/images/frankenender/assembly8.JPG" alt="" onclick="toggleFullScreen(this)">

## Testing
