### Introduction
<br>
The Multivibrator circuits are widely used in electronics. It is the electronics circuit which is used to implement the two state devices like Relaxation Oscillator, Timer and Flip-flops. The two states refers to the two voltage levels of the output. (e.g  0V, and 5V). Many times the two voltage levels are also represented as either logic high (e.g 5V) and logic low. (e.g 0V).<br>

### 1)Astable multivibrator 

In the 555 Oscillator above, pin 2 and pin 6 are connected together allowing the circuit to retrigger itself on each and every cycle allowing it to operate as a free running oscillator. During each cycle capacitor, C charges up through both timing resistors, R<sub>1</sub> and R<sub>2</sub> but discharges itself only through resistor, R<sub>2</sub> as the other side of R<sub>2</sub> is connected to the discharge terminal, pin 7. Then the capacitor charges up to 2/3V<sub>cc</sub> (the upper comparator limit) which is determined by the 0.693(R<sub>1</sub>+R<sub>2</sub>)C combination and discharges itself down to 1/3V<sub>cc</sub> (the lower comparator limit) determined by the 0.693(R<sub>2</sub>.C) combination. This results in an output waveform whose voltage level is approximately equal to Vcc - 1.5V and whose output "ON" and "OFF" time periods are determined by the capacitor and resistors combinations. The individual times required completing one charge and discharge cycle of the output is therefore given as:<br>
<center><b><br>t<sub>1</sub> = 0.693 (R<sub>1</sub>+R<sub>2</sub>)C  <br> t<sub>2</sub> = 0.693 R<sub>2</sub>C <br>  T = t<sub>1</sub> + t<sub>2</sub> <br>Frequency(F) = 1/T <br>Duty cycle = T<sub>on</sub></b></center><br><br>

<center><img src="images/astable.jpg" ></center><br>
<center><b>Figure 1. Astable multivibrator </b></center>
                
### 2)Monostable multivibrator

It has one stable and one quasi stable state. The circuit is useful for generating single output pulse of time duration in response to a triggering signal. The width of the output pulse depends only on external components connected to the op-amp. The diode gives a negative triggering pulse. When the output is +V<sub>sat</sub>, a diode clamps the capacitor voltage to 0.7V then, a negative going triggering impulse magnitude Vi passing through RC and the negative triggering pulse is applied to the positive terminal. Let us assume that the circuit is instable state. The output V<sub>0i</sub> is at +V<sub>sat</sub>. The diode D<sub>1</sub> conducts and V<sub>c</sub> the voltage across the capacitor ‘C’ gets clamped to 0.7V,the voltage at the positive input terminal through R<sub>1</sub>R<sub>2</sub> potentiometer divider is +ßV<sub>sat</sub>. Now, if a negative trigger of magnitude Vi is applied to the positive terminal so that the effective signal is less than 0.7V.the output of the Op-Amp will switch from +V<sub>sat</sub> to –V<sub>sat</sub>. The diode will now get reverse biased and the capacitor starts charging exponentially to –V<sub>sat</sub>. When the capacitor charge V<sub>c</sub> becomes slightly more negative than –ßV<sub>sat</sub>, the output of the op-amp switches back to +V<sub>sat</sub>. The capacitor ‘C’ now starts charging to +V<sub>sat</sub> through R until V<sub>c</sub> is 0.7V.<br>            
<center><b><br> V<sub>0</sub> = V<sub>f</sub> + (V<sub>i</sub>-V<sub>f</sub>) 𝑒<sup>𝑡/𝑅𝐶</sup> , <br>ß = R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>) <br>
If V<sub>sat</sub> >> V<sub>p</sub> and R<sub>1</sub>=R<sub>2</sub> and ß = 0.5,<br> 
Then, T = 0.69RC </b></center><br><br>
The circuit diagram of a monostable multivibrator is shown below.<br><br>
<center><img src="images/monostable.jpg" ></center><br>
<center><b>Figure 2. Monostable multivibrator </b></center>

### Schematic Diagram Of IC 555 
<center><img src="images/555.jpg" alt=""></center><br>
<center><b>Figure 3. Schematic Diagram Of IC 555  </b></center>