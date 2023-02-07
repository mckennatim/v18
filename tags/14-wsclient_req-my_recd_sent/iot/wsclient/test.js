const server=
{
  "mqtt_server": "sitebuilt.net",
  "mqtt_port": "1884"
}

const specs = {
  HAStIMER: 28,
  notTimerTags: ["temp", "onoff", "hilimit", "lolimit"],
  sr: [{ id: 0, hayrelay: 0, sensor: { senses: "temp", model: "DSP18b20" } }],
};


const zones = [
  {"id": "contact", "name": "a short description", "img": "contact.png" },
  {"id": "strike", "name": "a short description", "img": "strike.png" },
  {"id": "ledRed", "name": "a short descrition", "img": "ledRed.png" },
  {"id": "ledGreen", "name": "a short descrition", "img": "ledGreen.png" },
  {"id": "ledBlue", "name": "a short descrition", "img": "ledBlue.png" },
  {"id": "lr", "name": "a short descrition", "img": "lr.png" },
  {"id": "mb", "name": "a short descrition", "img": "mb.png" },
  {"id": "temp_out", "name": "outside temperature", "img": "temp_out.png" },
]

const devs = {
  "CYURD127": [
    {
      "sr": "f.sr",
      "label": "f.label"
    },
    {
      "sr": "f.sr",
      "label": "f.label"
    },
    {
      "sr": "f.sr",
      "label": "f.label"
    },
    {
      "sr": "f.sr",
      "label": "f.label"
    },
    {
      "sr": "f.sr",
      "label": "f.label"
    },
    {
      "sr": "f.sr",
      "label": "f.label"
    },
    {
      "sr": "f.sr",
      "label": "f.label"
    }
  ],
  "CYURD006": [
    {
      "sr": "f.sr",
      "label": "f.label"
    }
  ]
}

devs: {'{\r\n' +
        '  "CYURD127": [\r\n' +
        '    {\r\n' +
        '      "sr": 0,\r\n' +
        '      "label": "contact"\r\n' +
        '    },\r\n' +
        '    {\r\n' +
        '      "sr": 1,\r\n' +
        '      "label": "strike"\r\n' +
        '    },\r\n' +
        '    {\r\n' +
        '      "sr": 2,\r\n' +
        '      "label": "ledRed"\r\n' +
        '    },\r\n' +
        '    {\r\n' +
        '      "sr": 3,\r\n' +
        '      "label": "ledGreen"\r\n' +
        '    },\r\n' +
        '    {\r\n' +
        '      "sr": 4,\r\n' +
        '      "label": "ledBlue"\r\n' +
        '    },\r\n' +
        '    {\r\n' +
        '      "sr": 5,\r\n' +
        '      "label": "lr"\r\n' +
        '    },\r\n' +
        '    {\r\n' +
        '      "sr": 6,\r\n' +
        '      "label": "mb"\r\n' +
        '    }\r\n' +
        '  ],\r\n' +
        '  "CYURD006": [\r\n' +
        '    {\r\n' +
        '      "sr": 0,\r\n' +
        '      "label": "temp_out"\r\n' +
        '    }\r\n' +
        '  ]\r\n' +
        '}'
      zones : '\r\n' +
        '[\r\n' +
        '  {"id": "contact", "name": "a short description", "img": "contact.png" },\r\n' +
        '  {"id": "strike", "name": "a short description", "img": "strike.png" },\r\n' +
        '  {"id": "ledRed", "name": "a short descrition", "img": "ledRed.png" },\r\n' +
        '  {"id": "ledGreen", "name": "a short descrition", "img": "ledGreen.png" },\r\n' +
        '  {"id": "ledBlue", "name": "a short descrition", "img": "ledBlue.png" },\r\n' +
        '  {"id": "lr", "name": "a short descrition", "img": "lr.png" },\r\n' +
        '  {"id": "mb", "name": "a short descrition", "img": "mb.png" },\r\n' +
        '  {"id": "temp_out", "name": "outside temperature", "img": "temp_out.png" }\r\n' +
        ']'
    }



    [
      { id: "temp_gh", name: "Greenhouse Temperature", img: "temp_gh.jpg" },
      { id: "hum_gh", name: "Greenhouse Humidity", img: "hum_gh.jpg" },
      { id: "light_gh", name: "Greenhouse Lights", img: "light_gh.jpg" },
      { id: "temp_out", name: "Outside Temperature", img: "temp_out.jpg" },
    ];


    
[
  {"id": "contact", "name": "a short description", "img": "contact.png" },
  {"id": "strike", "name": "a short description", "img": "strike.png" },
  {"id": "ledRed", "name": "a short descrition", "img": "ledRed.png" },
  {"id": "ledGreen", "name": "a short descrition", "img": "ledGreen.png" },
  {"id": "ledBlue", "name": "a short descrition", "img": "ledBlue.png" },
  {"id": "lr", "name": "a short descrition", "img": "lr.png" },
  {"id": "mb", "name": "a short descrition", "img": "mb.png" },
  {"id": "temp_out", "name": "outside temperature", "img": "temp_out.png" },
]

{ "CYURD004": [{ "sr": 0, "label": "temp_gh" }, { "sr": 1, "label": "hum_gh" }, { "sr": 3, "label": "light_gh" }], "CYURD006": [{ "sr": 0, "label": "temp_out" }] }

{
  "CYURD127": [
    {
      "sr": 0,
      "label": "contact"
    },
    {
      "sr": 1,
      "label": "strike"
    },
    {
      "sr": 2,
      "label": "ledRed"
    },
    {
      "sr": 3,
      "label": "ledGreen"
    },
    {
      "sr": 4,
      "label": "ledBlue"
    },
    {
      "sr": 5,
      "label": "lr"
    },
    {
      "sr": 6,
      "label": "mb"
    }
  ],
  "CYURD006": [
    {
      "sr": 0,
      "label": "temp_out"
    }
  ]
}

[
  {
    "id": "empty",
    "name": "Pond is Empty",
    "img": "empty.jpg"
  },
  {
    "id": "full",
    "name": "Pond is Full",
    "img": "full.jpg"
  },
  {
    "id": "temp_out",
    "name": "Outside Temp",
    "img": "temp_out.jpg"
  },
  {
    "id": "lux",
    "name": "Light in Lux",
    "img": "lux.jpg"
  },
  {
    "id": "pond",
    "name": "Pond",
    "img": "pond.jpg"
  },
  {
    "id": "hi_bed",
    "name": "Upper Garden Bed",
    "img": "hi_bed.jpg"
  },
  {
    "id": "lo_bed",
    "name": "Lower Garden Bed",
    "img": "lo_bed.jpg"
  }
]

{
  "CYURD006": [
    {
      "sr": 0,
      "label": "temp_out"
    }
  ],
  "CYURD114": [
    {
      "sr": 0,
      "label": "lux"
    }
  ],
  "CYURD116": [
    {
      "sr": 3,
      "label": "empty"
    },
    {
      "sr": 4,
      "label": "full"
    },
    {
      "sr": 0,
      "label": "pond"
    },
    {
      "sr": 1,
      "label": "hi_bed"
    },
    {
      "sr": 2,
      "label": "lo_bed"
    }
  ]
}