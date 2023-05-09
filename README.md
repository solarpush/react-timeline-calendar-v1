<h1>Easy to use: </h1>

<p>Take 2 parameters : "list" a table of object with "name" key
and rdvTable a table of object with id, rdvStart, rdvEnd, assign, name, cp, keys . </p>

``` shell 
npm i react-timeline-calendar-v1
```

``` js
import TimeLine from 'react-timeline-calendar-v1';

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
    {
      id: "15513d31de55",
      rdvStart: "2023-05-06T14:00:00+02:00",
      rdvEnd: moment("2023-05-06T14:00:00+02:00").add(3, "h").format(),
      assign: null,
      name: "Mme Durand",
      cp: "69870",
    },
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
<TimeLine list={list} rdvTable={rdvTable} />

//optional argument : 
// clickRdvFunction= return id of rdvTable item
// colorSticker= string
// colorTeam= string
<TimeLine
            list={list}
            rdvTable={rdvTable}
            clickRdvFunction={clickRdvFunction}
            functionAssign={functionAssign}
            colorSticker={"rgb(21, 253, 188)"}
            colorTeam={"rgb(241, 203, 18)"}
          />
```

<img src="https://bnz07pap001files.storage.live.com/y4m7Ecd5KK-T7tbB7H4yX8FdozPcBF5OClPTbJuxMGKOvpVBn9REPlRgtTBs0xSvSmTKoz9ERMrREZiRBf-kJo023AYx68Itor6I-PWMpksShqzXp1evmh3ZHyLlJX4_QFuGVS6Gd_rV7TYJPxUftyjEU3HrGklF8PgE0d5XzVIhKRl6iMAGfiiXM7lU64KGuRv?width=1692&height=487&cropmode=none" />

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
<p>For next minor update add parameters: 
<ul>
<li >languages </li>
<li >defaultWidthView: number </li>
<li >defaultheightRow: number </li>
</ul>
You can now use the 'cp' key for inject any text in the rdv sticker or use empty string for useless this propriety.
</p>
<br/>
<h5><a href="https://playcode.io/1465220">Try it in playground </a> </h5>
<br/>

<sub>Made by Pierre Nicolas</sub>