---
layout: post
title:  "Introduce LazRadio"
date:   2014-11-20 18:20:22
tags: lazradio lazarus en
---

I like listening to my Redsun RP2100. Someday I bought an USB stick using the RTL2832U chip, and played around with [SDR#][sdr].

RTL2832U USB sticks open a door to cheap and portable SDRs. [GnuRadio][gnuradio] is a powerful toolkit 
that provides signal processing blocks to implement software-defined radios and signal processing systems,
but it is also not a easy job to get it run on Windows. 

As I am majoring in communication systems, and have done lots of work on software-defined radios (SDR), 
such as developing receivers on customized vector processors, and Pascal is the first programming
language that I have ever learned, [LazRadio](https://github.com/foldl/LazRadio) is born.

Here is a brief introduction.

#### Message Queue

Each module (or block) has a message queue. Messages in each queue are processed one after another.

There is a unique run queue (TRadioRunQueue) which creates several working threads and schedules them to serve 
the message queues.

Each message is composed of two fields (ParamL/H) of type PtrUInt, and a message ID obviously.

#### Data Transfer

Data are transfered from a source port of a module to a target port of another module by the RM\_DATA message.

Data (array of Complex) is managed by TRadioDataStream, can be sent to multiple modules, and is recycled 
after all receiving modules have processed the RM\_DATA message.

#### Connections

Message are passing along module connections. There are two type of connections, data
connection for RM\_DATA and feature connection for all other messages.

#### "LazRadio" Language

A system is described by the "LazRadio" language, or rather Pascal inspired by [Erlang](http://www.erlang.org). 

Although LazRadio is quite new, it's already possible to make some fun: make a dual-FM-receiver, listening to two
programs simultaneously, one ear one program or mixed as you like.

At last, below is a simulation of a classic encrypted telephone, in which the spectrum of speech is reversed.


[sdr]:     http://www.sdrsharp.com  "SDR"
[gnuradio]: http://gnuradio.org     "GnuRadio"
