---
layout: post
title:  "Introduce LazRadio"
date:   2014-11-20 18:20:22
tags: lazradio lazarus en
---

I like listening to my Redsun RP2100. Someday I bought an USB stick using the RTL2832U chip, and played around with [SDR#][sdr].

RTL2832U USB sticks open a door to cheap and portable SDRs. [GnuRadio][gnuradio] is a powerful toolkit 
that provides signal processing blocks to implement software-defined radios and signal processing systems,
but it is also not an easy job to get it run on Windows. 

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

{% highlight haskell %}
{% raw %}
lazradio encrypt-telephone;

var
  mic: AudioIn;
  speaker: AudioOut;
  voice-bpf1: Filter;  // '-' can be used in identifiers
  voice-bpf2: Filter;
  voice-bpf3: Filter;
  up-converter1: FreqMixer;
  up-converter2: FreqMixer;
  s-reversed: Spectrum;
  s-recovered: Spectrum;
  amix: AudioMixer;

begin
  // => connect both feature and data
  // -> data connection
  // :> feature connection
  mic => voice-bpf1 => up-converter1 => voice-bpf2
                    => up-converter2 => voice-bpf3;

  voice-bpf2 => s-reversed;
  voice-bpf2 => amix => speaker;

  voice-bpf3 => s-recovered;
  voice-bpf3 -> [1]amix;    // connect to target port 1 of amix

  // use '!' to send messages
  // set these filters as BPF, passband [300, 3400]kHz. 
  voice-bpf1 ! {RM_SET_FEATURE, RM_FEATURE_SAMPLE_RATE, 44100}
             ! {RM_FILTER_CONFIG, FILTER_COEFF_DOMAIN, FILTER_COEFF_DOMAIN_REAL}
             ! {RM_FILTER_CONFIG, FILTER_TAPS, 200}
             ! {RM_SPECTRUM_BAND_SELECT_1, 300, 3400};
  voice-bpf2 ! {RM_SET_FEATURE, RM_FEATURE_SAMPLE_RATE, 44100}
             ! {RM_FILTER_CONFIG, FILTER_COEFF_DOMAIN, FILTER_COEFF_DOMAIN_REAL}
             ! {RM_FILTER_CONFIG, FILTER_TAPS, 200}
             ! {RM_SPECTRUM_BAND_SELECT_1, 300, 3400};
  voice-bpf3 ! {RM_SET_FEATURE, RM_FEATURE_SAMPLE_RATE, 44100}
             ! {RM_FILTER_CONFIG, FILTER_COEFF_DOMAIN, FILTER_COEFF_DOMAIN_REAL}
             ! {RM_FILTER_CONFIG, FILTER_TAPS, 200}
             ! {RM_SPECTRUM_BAND_SELECT_1, 300, 3400};

  up-converter1 ! {RM_SET_FEATURE, RM_FEATURE_SAMPLE_RATE, 44100}
                ! {RM_FREQMIXER_SET_FREQ, 3400 + 300, 1};
  up-converter2 ! {RM_SET_FEATURE, RM_FEATURE_SAMPLE_RATE, 44100}
                ! {RM_FREQMIXER_SET_FREQ, 3400 + 300, 1};

  s-reversed    ! {RM_SPECTRUM_CFG, SET_CENTER_FREQ, 0}
                ! {RM_SPECTRUM_CFG, SET_SPAN, 10000};
  s-recovered   ! {RM_SPECTRUM_CFG, SET_CENTER_FREQ, 0}
                ! {RM_SPECTRUM_CFG, SET_SPAN, 10000};

  // encrypted signal send to left channel, decrypted signal to right channel
  amix ! {RM_AUDIOMIXER_CFG, AUDIOMIXER_STREAM_NUM, 2}
       ! {RM_AUDIOMIXER_SET_STREAM_OUPUT, 0, AUDIOMIXER_STREAM_OUTPUT_I_I}
       ! {RM_AUDIOMIXER_SET_STREAM_OUPUT, 1, AUDIOMIXER_STREAM_OUTPUT_I_Q};
end.
{% endraw %}
{% endhighlight %}

[sdr]:     http://www.sdrsharp.com  "SDR"
[gnuradio]: http://gnuradio.org     "GnuRadio"
