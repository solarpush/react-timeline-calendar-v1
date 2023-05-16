<h1>Easy to use: </h1>

<p>Take 2 parameters : "list" a table of object with "name" key
and rdvTable a table of object with id, rdvStart, rdvEnd, assign, name, cp, keys . </p>

``` shell 
npm i react-timeline-calendar-v1
```

``` js
import TimeLine from 'react-timeline-calendar-v1';
import moment from 'moment';

const list = [{ name: "equipe 1" }, { name: "equipe 2" }];
const rdvTable = [
    {
      id: "1515151r3f5",
      rdvStart: moment("2023-05-06T11:15:00+02:00").format(),
      rdvEnd: moment("2023-05-06T11:15:00+02:00").add(7, "h").format(),
      assign: "equipe 1",
      name: "Mr rigolo",
      cp: "69700",
    },
    {
      id: "15513d31de55",
      rdvStart: "2023-05-06T14:00:00+02:00",
      rdvEnd: moment("2023-05-06T14:00:00+02:00").add(3, "h").format(),
      assign: "equipe 2",
      name: "Mme Durand",
      cp: "69870",
    },
  ];
  // sample if same color list for team and rdv but you can attributes other color (i optional default color's exist in TimeLine)
  const colorList = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  //sample of function 
  function clickRdvFunction(id) {
    console.log(id);
  }

  //sample of functionAssign
  function functionAssign(id) {
    console.log(id)
  }
  

  ```

  ```jsx

  //minimal use
<TimeLine 
list={list} 
rdvTable={rdvTable}
colorSticker={colorList}
colorTeam={colorList}
 />

//optional argument : 
// clickRdvFunction= return id of rdvTable item
// colorSticker= string
// colorTeam= string
<TimeLine
            list={list}
            rdvTable={rdvTable}
            colorSticker={colorList}
            colorTeam={colorList}
            //optionnal function
            clickRdvFunction={clickRdvFunction}
            functionAssign={functionAssign}
          />
```

<img src="https://bnz07pap001files.storage.live.com/y4mzTNchPpNulrjewodsvEDcyjdtp-Ao7JolOG7JCmXkc7MkEEbLcP96pdBZVxCtXcYJyzhAf1XOCbAsCEIHIhbWzctpUWH8HT8My5qqG19ivV2KXyDiBnGZYETwWws0hdj0vLTmKfub5dJsFQbPrD1qn7OLaOp_X3q5kNbh1sAW82gX1cfmi72kaNYRpmnFEYp?width=1554&height=695&cropmode=none" />

```js
// Sample of convert function for other Data to use in component 

const convertToTable = yourData.map((item) => {
    const convert = {
      id: item.id,
      rdvStart: moment(item.otherKeyStart).format(),
      rdvEnd: moment(item.otherKeyEnd).format(),
      assign: modalTeamValue !== null ? modalTeamValue : null ,
      name: item.lastName,
      cp: item.address ,
    };
    return convert;
  });

<TimeLine list={list} rdvTable={convertToTable} />

```
<p>actual 1.0.0 normaly break code, you can exchange to github issue.

new in 1.0.0 if years or month view you can click action for change view 
year => month
month => day

In 1.0.0 accept large table of data. <br/>

You can now use the 'cp' key for inject any text in the rdv sticker or use empty string for useless this propriety.
</p>
<ul>
<li >languages </li>
<li >defaultWidthView: number </li>
<li >defaultheightRow: number </li>
</ul>
<br/>
<h5><a href="https://playcode.io/1465220">Try it in playground </a> </h5>
<br/>

<sub>Made by Pierre Nicolas</sub>