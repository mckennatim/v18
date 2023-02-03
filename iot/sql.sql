INSERT INTO `devs` (`id`, `devid`, `devpwd`, `description`, `bizid`, `locid`, `server`, `specs`, `owner`, `apps`) VALUES (NULL, 'CYURD129', 'geniot', 'doorStrike\r\n### operation\r\nWhen the door is closed, with contacts closed and the strike is locked (not powered, fail secure) the LED is red. When the button is pushed on the app the strike is released and the LED goes green. Once the door is opened the LED turns blue, which signals the app to turn unpush the button and lock the stike. Once the door closes and the contacts connect, the led turnd red.\r\n\r\n### configuration\r\nThe device has: \r\n\r\n- 1 input: the magnetic door contact\r\n - D2 - sr0 contact\r\n- 4 outputs: the strike and the red, green and blue LED. \r\n - D6 - sr1 redLED\r\n - D7 - sr2 greenLED\r\n - D8 - sr3 blueLED\r\n - D1 - sr4 strike\r\n\r\nCONFIG_CYURD127strike running on iot2/secstidif\r\nhas no CUSTOM CODE', 'sbs', '255ChestnutAve', 'char devid[9]=\"CYURD127\";\r\nchar owner[254]=\"mckenna.tim@gmail.com\";\r\nchar pwd[24]=\"geniot\";\r\nchar mqtt_server[60]=\"sitebuilt.net\";\r\nchar mqtt_port[6]=\"1884\";', 'const portsin_t inpo {\r\n 0, //DS18b20a\r\n 0, //DS18b20b\r\n 0,//dht11\r\n 0, //ANALOG\r\n 0, //SPIdo\r\n 0, //SPIcs\r\n 0};//shares i2c D2 and D1\r\n/*SE constant declarations*/ \r\nconst sen_t SE {\r\n 0,//number of different sensor types\r\n 0,//number of sensors(numsens)\r\n {}\r\n};\r\n/*------------------------------------------------------\r\nCONFIG extern structures (initial values, changeable)*/\r\n/*srs extern data structure initalization\r\nstate of relays and sensors */ \r\nsrs_t srs {\r\n 3,//numsr\r\n 0,//sumse\r\n {},\r\n 0,//numcs\r\n {},\r\n 3,//numti\r\n { //{sr,onoff,rec,isnew}\r\n {0,0,1,0},{1,0,1,0},{2,0,1,0}\r\n }\r\n};\r\n/*prgs extern data structure initalization*/ \r\nprgs_t prgs{\r\n 3,//numprgs\r\n { //sr,aid,ev,numdata,prg[[]],port,hms\r\n {0,255,1,2,{{0,0,0}},D5,1506}, \r\n {1,255,1,1,{{0,0,1}},D6,1504},\r\n {2,255,1,1,{{0,0,0}},D7,1503}\r\n }\r\n};', 'mckenna.tim@gmail.com', '[\"admin\", \"base\", \"shrooms\", \"hvac\", \"lightsoff\", \"timr\", \"strike\"]')


SELECT * FROM `devs` ORDER BY `devs`.`devid` DESC;

DELETE FROM devs WHERE `devs`.`id` = 9

    INSERT INTO `devs` (`id`, `devid`, `owner`, `devpwd`, `locid`, `description`) VALUES (NULL, 'CYURD127', 
    'tim@sitebuilt.net',
    'geniot',
    '255ChestnutAve',
    'doorStrike with strike RGB LEDs and contacts. Part of entry system project that has doorbells, camera and aprtment UI.'
    );
