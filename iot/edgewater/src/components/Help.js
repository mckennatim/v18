import React,{useContext} from 'react'
import {AContext} from '../contexts/acontext'
import ReactMarkdown from 'react-markdown'
import mkdn from '../../STEWARD.md'

console.log('mkdn: ', mkdn);

export default function Help(){
  const {visiblePages} = useContext(AContext)
  return(
    
    <div style ={styles.help.div0}>
      {visiblePages.map((p,i)=>(<div key={i}>{p}</div>))}
      <h2>Stewards</h2>

      <h3>Intallation and Startup</h3>
      The Edgewater Water Control (EWC) is powered from the USB on the electric panel. Before rebooting with the Side Button or reconnecting to USB, pull the fuses for the outdoor solenoids. Once the EWC has booted up and is running, you can put in the solenoid fuse. You can tell if the EWC is running by pressing the Top Button and seeing an LED go on in the controller. Press the Top Button again to shut it down then put in the solenoid fuse.

      <h3>Edgwater Water Control basic operation</h3>

      <h4>Top Button</h4>
      Top button press begins a watering sequence starting with zone 1 and ending with zone 4. Each zone gets watered in turn for 60 minutes (default). Pressing the top button a second time, while zone 1 is operating, cancels the watering sequence.

      <h4>Side Button</h4>
      Pressing the Side button for 1 second reboots the Edgewater Water control. This can take up to 4 minutes.

      <h3>Advanced operation for Stewards</h3>

      <p>Edgewater Water Control (EWC) generally operates without WIFI/internet with default settings for successive watering of zone 1, 2, 3 & 4. The current default setting is 60 minutes (3600 sec) for each zone</p>

      <p>On startup, EWC does search for a WIFI connection for about 4 minutes before it is ready to operate.</p>

      <p>This app has two pages 'help' and 'contol'. Noah can give you access to the 'control' part of the app which allows you to send commands to the EWC device from the <a href="https://apps.sitebuilt.net/edgewater/#/control">https://apps.sitebuilt.net/edgewater/#/control</a> when the EWC is connected to the internet through a phone hotspot. At this point the app is not at all polished and is mainly used by the device developer for trouble shooting and re-programming.</p>

      <h4>phone hot spot control</h4>
      <p>Hot spot use allows for quick reset of EWC and for customizing the schedule for EWC</p>

      <p>To usr this feature you need to activate the hot spot feature on your phone, then rename the hotspot SSID to "Edgewater" with a password "jjjjjjjj" (8 j's)</p>

      <p>Turn on the hotspot and then reboot the EWC device by pressing the side button for 1 second. In 20 seconds or so, your phone may indicate that 1 device is connected. Now it is ready to operate, pressing the Top Button will start the watering sequence. This is considerably faster than rebooting without a hotspot on.</p>

      <p>The control page of the app, when the EWC is connected to a hotspot, allows for some monitoring and control of the device.</p>
        
      <h5>monitoring</h5>  
       <p>Each relay has an entry like [ 0, 3600]. The first number is 0 when that relay is off and 1 when the relay is on. The second number is the number of seconds that relay will be on. If the relay is on, 'timeleft' indicates the number of seconds left for that zone.</p>

      <h5>control</h5> 
      <p>To change the watering duration for a zone, enter 0,xxx (no spaces) and press enter where xxx is the watering duration in seconds. To start the watering press from the app, in zone1 enter 1,xxx and press enter. You can also skip a zone and start in zone 2, 3 or 4 by puttin 1,xxx and enter in one of thos boxes. Do not turn on more than one zone at a time as the system is designed to water one zone at a time </p>

    </div>
  )
}

const styles ={
  help:{
    div0:{
      backgroundColor: '#c7b1c9'
    }
  }
}