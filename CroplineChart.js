import React, { useState } from "react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./CroplineChart.css";

const statesData = {
  "Andaman And Nicobar": [
    { crop: "Banana", production: 97424.65, area: 12145.89 },
    { crop: "Coconut", production: 97424.65, area: 190722.25 },
    { crop: "Cotton", production: "", area: "" },
    { crop: "jute", production: "", area: "" },
    { crop: "Maize", production: 367.62, area: 163.54 },
    { crop: "Potato", production: "", area: "" },
    { crop: "rice", production: 223006.06, area: 77714.93 },
    { crop: "Soyabean", production: "", area: "" },
    { crop: "Sugarcane", production: 30638.67, area: 1504.51 },
    { crop: "Wheat", production: "", area: "" },
  ],
  "Andhra Pradesh": [
    { crop: "Banana", production: 15041631, area: 587709 },
    { crop: "Coconut", production: 16806002260, area: 1332907 },
    { crop: "Cotton", production: "", area: "" },
    { crop: "Jute", production: 17882076, area: 7421436 },
    { crop: "Maize", production: 216449, area: 19814 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 143742455, area: 46548311 },
    { crop: "Soyabean", production: 23028, area: 20577 },
    { crop: "Sugarcane", production: 226730305, area: 2948672 },
    { crop: "Wheat", production: 17228176178, area: 61878411 },
  ],
  "Arunachal Pradesh": [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 1058829, area: 751806 },
    { crop: "Jute", production: 578571, area: 76510 },
    { crop: "Maize", production: 2709476.6, area: 2209673 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 6465, area: 5065 },
    { crop: "Soyabean", production: 384639, area: 20278 },
    { crop: "Sugarcane", production: 102145, area: 67142 },
    { crop: "Wheat", production: 4840125.6, area: 3130474 },
  ],
  Assam: [
    { crop: "Banana", production: 11724386, area: 812277 },
    { crop: "Coconut", production: 1954408105, area: 322687 },
    { crop: "Cotton(lint)", production: 12341, area: 26519 },
    { crop: "Jute", production: 11789532, area: 1207168 },
    { crop: "Maize", production: 389382, area: 347592 },
    { crop: "Potato", production: 11021521, area: 1480254 },
    { crop: "Rice", production: 71801090, area: 44751469 },
    { crop: "Soyabean", production: "", area: "" },
    { crop: "Sugarcane", production: 18845994, area: 497050 },
    { crop: "Wheat", production: 1218370, area: 1045627 },
  ],
  Bihar: [
    { crop: "Banana", production: 2884412, area: 162306 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton(lint)", production: 488, area: 243 },
    { crop: "Jute", production: 20300657, area: 2388886 },
    { crop: "Maize", production: 32232829, area: 11630046 },
    { crop: "Potato", production: 14035519, area: 1576835 },
    { crop: "Rice", production: 92022922, area: 57733403 },
    { crop: "Soyabean", production: "", area: "" },
    { crop: "Sugarcane", production: 106227183, area: 2239010 },
    { crop: "Wheat", production: 81020206, area: 37853724 },
  ],
  Chandigarh: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton(lint)", production: 4225, area: 1640 },
    { crop: "Jute", production: 13795, area: 583 },
    { crop: "Maize", production: 3853, area: 850 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 39465, area: 8730 },
    { crop: "Soyabean", production: 61338, area: 11803 },
    { crop: "Sugarcane", production: "", area: "" },
    { crop: "Wheat", production: "", area: "" },
  ],
  Chhattisgarh: [
    { crop: "Banana", production: 294156, area: 7943 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton(lint)", production: 334, area: 2181 },
    { crop: "Jute", production: 1596, area: "" },
    { crop: "Maize", production: 1912, area: 2351292 },
    { crop: "Potato", production: 1558783, area: 874066 },
    { crop: "Rice", production: 166699, area: 81498618 },
    { crop: "Soyabean", production: 58342528, area: 905204 },
    { crop: "Sugarcane", production: 951764, area: 2499956 },
    { crop: "Wheat", production: 155538, area: 1674120 },
  ],
  "Dadra and Nagar Haveli": [
    { crop: "Banana", production: 4808, area: 691 },
    { crop: "Coconut", production: 117288, area: 1640 },
    { crop: "Cotton(lint)", production: "", area: "" },
    { crop: "Jute", production: 1100, area: 1102 },
    { crop: "Maize", production: "", area: "" },
    { crop: "Potato", production: 454865, area: 230982 },
    { crop: "Rice", production: "", area: "" },
    { crop: "Soyabean", production: 1115995, area: 14456 },
    { crop: "Sugarcane", production: 17134, area: 9015 },
    { crop: "Wheat", production: 1711190, area: 257886 },
  ],
  Goa: [
    { crop: "Banana", production: 53190, area: 4704 },
    { crop: "Coconut", production: 503112559, area: 153021 },
    { crop: "Cotton(lint)", production: "", area: "" },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: "", area: "" },
    { crop: "Potato", production: 1432244, area: 552280 },
    { crop: "Rice", production: "", area: "" },
    { crop: "Soyabean", production: 570984, area: 10758 },
    { crop: "Sugarcane", production: "", area: "" },
    { crop: "Wheat", production: 505168977, area: 720763 },
  ],
  Gujarat: [
    { crop: "Banana", production: 25402100, area: 381000 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton(lint)", production: 85777500, area: 32970500 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 10130600, area: 7132300 },
    { crop: "Potato", production: 17283000, area: 738700 },
    { crop: "Rice", production: 19084200, area: 10942100 },
    { crop: "Soyabean", production: 137900, area: 172600 },
    { crop: "Sugarcane", production: 212022800, area: 3112400 },
    { crop: "Wheat", production: 36783800, area: 13697300 },
  ],
  Haryana: [
    { crop: "Banana", production: 0, area: 206 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton(lint)", production: 25258700, area: 8851074 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 652, area: 556200 },
    { crop: "Potato", production: 247003, area: 3621500 },
    { crop: "Rice", production: 173509, area: 49318300 },
    { crop: "Soyabean", production: 17371994, area: 5 },
    { crop: "Sugarcane", production: 112680900, area: 2052951 },
    { crop: "Wheat", production: 158647000, area: 37734933 },
  ],
  "Himachal Pradesh": [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: 158, area: 329 },
    { crop: "Cotton(lint)", production: "", area: "" },
    { crop: "Jute", production: 7813360, area: 3584997 },
    { crop: "Maize", production: 1233663, area: 129929 },
    { crop: "Potato", production: 1419350, area: 960488 },
    { crop: "Rice", production: 9319, area: 6311 },
    { crop: "Soyabean", production: 273233.1, area: 23689 },
    { crop: "Sugarcane", production: 6105703, area: 4376546 },
    { crop: "Wheat", production: 16854786.1, area: 9082289 },
  ],

  "Jammu and Kashmir": [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: 109.6, area: 222 },
    { crop: "Cotton(lint)", production: "", area: "" },
    { crop: "Jute", production: 4753864, area: 3179109 },
    { crop: "Maize", production: 126900.9, area: 12609 },
    { crop: "Potato", production: 4116594.4, area: 2564431 },
    { crop: "Rice", production: 4968.7, area: 2237 },
    { crop: "Soyabean", production: 3690143.8, area: 2378736 },
    { crop: "Sugarcane", production: 12692581.4, area: 8137344 },
    { crop: "Wheat", production: "", area: "" },
  ],
  Jharkhand: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton(lint)", production: 631550.15, area: 471202.84 },
    { crop: "Jute", production: 1365212.66, area: 182409.67 },
    { crop: "Maize", production: 7527411.94, area: 7726361.13 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 82173.01, area: 2566.82 },
    { crop: "Soyabean", production: 569101.3, area: 454564.96 },
    { crop: "Sugarcane", production: 10175449.06, area: 8837105.42 },
    { crop: "Wheat", production: "", area: "" },
  ],

  Karnataka: [
    { crop: "Banana", production: 10986598, area: 577792 },
    { crop: "Coconut", production: 56767101.29, area: 6708655 },
    { crop: "Cotton(lint)", production: 15319987, area: 8783925 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 48308900, area: 17036770 },
    { crop: "Potato", production: 5950292, area: 797757 },
    { crop: "Rice", production: 65837072.79, area: 24866419 },
    { crop: "Soyabean", production: 1844638, area: 2250474 },
    { crop: "Sugarcane", production: 515845482, area: 5739787 },
    { crop: "Wheat", production: 3856245, area: 4490477 },
  ],

  Kerala: [
    { crop: "Banana", production: 7655661.99, area: 924783.54 },
    { crop: "Coconut", production: 97803036000, area: 15504052.07 },
    { crop: "Cotton", production: 59982, area: 38619 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 155, area: 298 },
    { crop: "Potato", production: 54534, area: 2972 },
    { crop: "Rice", production: 10593347.58, area: 4512943.24 },
    { crop: "Soyabean", production: 20.4, area: 14 },
    { crop: "Sugarcane", production: 3819915.84, area: 50444.67 },
    { crop: "Wheat", production: 3, area: 2 },
  ],
  "Madhya Pradesh": [
    { crop: "Banana", production: 6405551, area: 150261 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 10109481.1, area: 9659520 },
    { crop: "Jute", production: 8650, area: 5662 },
    { crop: "Maize", production: 22546783, area: 14086126 },
    { crop: "Potato", production: 10386198, area: 822870 },
    { crop: "Rice", production: 27622679, area: 27583773 },
    { crop: "Soyabean", production: 85273955, area: 84196696 },
    { crop: "Sugarcane", production: 33870810, area: 847633 },
    { crop: "Wheat", production: 147153856, area: 74390328 },
  ],
  Maharashtra: [
    { crop: "Banana", production: 3634720, area: 57700 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 71786349, area: 54264046 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 20853343, area: 9104564 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 43008628, area: 25672465 },
    { crop: "Soyabean", production: 39994352, area: 36352336 },
    { crop: "Sugarcane", production: 938485965, area: 11514728 },
    { crop: "Wheat", production: 22443475, area: 15856530 },
  ],
  Manipur: [
    { crop: "Banana", production: 509781, area: 43551 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 260, area: 690 },
    { crop: "Jute", production: 80, area: 40 },
    { crop: "Maize", production: 91133, area: 35286 },
    { crop: "Potato", production: 131800, area: 25200 },
    { crop: "Rice", production: 3850798, area: 1628585 },
    { crop: "Soyabean", production: 2717, area: 2355 },
    { crop: "Sugarcane", production: 134912, area: 4137 },
    { crop: "Wheat", production: 4721481, area: 1739844 },
  ],
  Meghalaya: [
    { crop: "Banana", production: 1171262, area: 99366 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 126771, area: 130172 },
    { crop: "Jute", production: 685687, area: 80221 },
    { crop: "Maize", production: 498875, area: 309467 },
    { crop: "Potato", production: 2853298, area: 311742 },
    { crop: "Rice", production: 3531474, area: 1885907 },
    { crop: "Soyabean", production: 21226, area: 16982 },
    { crop: "Sugarcane", production: 4286, area: 1541 },
    { crop: "Wheat", production: 42192, area: 24808 },
  ],
  Mizoram: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: 40, area: 15 },
    { crop: "Cotton", production: 8868, area: 4272 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 196048, area: 112666 },
    { crop: "Potato", production: 21163, area: 4683 },
    { crop: "Rice", production: 1138604, area: 730332 },
    { crop: "Soyabean", production: 15240, area: 11432 },
    { crop: "Sugarcane", production: 161231, area: 14729 },
    { crop: "Wheat", production: 101, area: 123 },
  ],
  Nagaland: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 6830, area: 6401 },
    { crop: "Jute", production: 136480, area: 67330 },
    { crop: "Maize", production: 1673600, area: 959250 },
    { crop: "Potato", production: 886310, area: 88020 },
    { crop: "Rice", production: 5269790, area: 2963650 },
    { crop: "Soyabean", production: 484190, area: 375890 },
    { crop: "Sugarcane", production: 2216170, area: 49900 },
    { crop: "Wheat", production: 110810, area: 60700 },
  ],
  Odisha: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 126120, area: 77280 },
    { crop: "Jute", production: 747092.9, area: 172258 },
    { crop: "Maize", production: 2667442.8, area: 1461727 },
    { crop: "Potato", production: 1520018.3, area: 142338 },
    { crop: "Rice", production: 119422742, area: 86347043 },
    { crop: "Soyabean", production: 10, area: 60 },
    { crop: "Sugarcane", production: 18114891.6, area: 293338 },
    { crop: "Wheat", production: 120656.7, area: 85978 },
  ],
  Puducherry: [
    { crop: "Banana", production: 138800, area: 4382 },
    { crop: "Coconut", production: 379139000, area: 30829 },
    { crop: "Cotton", production: 11890, area: 3885 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: "", area: "" },
    { crop: "Potato", production: 985958, area: 385197 },
    { crop: "Rice", production: "", area: "" },
    { crop: "Soyabean", production: 4151379, area: 36007 },
    { crop: "Sugarcane", production: 384427027, area: 460300 },
    { crop: "Wheat", production: "", area: "" },
  ],
  Punjab: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 29262000, area: 9400000 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 8052000, area: 2662000 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 179702000, area: 48099000 },
    { crop: "Soyabean", production: "", area: "" },
    { crop: "Sugarcane", production: 88780000, area: 1318080 },
    { crop: "Wheat", production: 276946000, area: 62138000 },
  ],
  Rajasthan: [
    { crop: "Banana", production: 0, area: 96 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 5571377, area: 6332426 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 19133051, area: 14366543 },
    { crop: "Potato", production: 791486, area: 75245 },
    { crop: "Rice", production: 2684728, area: 1883061 },
    { crop: "Soyabean", production: 10651942, area: 9130082 },
    { crop: "Sugarcane", production: 7828877, area: 155780 },
    { crop: "Wheat", production: 94669124, area: 33613521 },
  ],
  Sikkim: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 1323547, area: 692234 },
    { crop: "Jute", production: 60460, area: 13230 },
    { crop: "Maize", production: 383136, area: 225617 },
    { crop: "Potato", production: 58430, area: 67308 },
    { crop: "Rice", production: "", area: "" },
    { crop: "Soyabean", production: "", area: "" },
    { crop: "Sugarcane", production: 106540, area: 85264 },
    { crop: "Wheat", production: 1932113, area: 1083653 },
  ],
  "Tamil Nadu": [
    { crop: "Banana", production: 58716087, area: 1379255 },
    { crop: "Coconut", production: 10937742655, area: 3821909 },
    { crop: "Cotton", production: 4277078, area: 2369024 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 3, area: 11201656 },
    { crop: "Potato", production: 3172374, area: 1081953 },
    { crop: "Rice", production: 62704, area: 100122666 },
    { crop: "Soyabean", production: 32386903, area: "" },
    { crop: "Sugarcane", production: 630, area: 847496816 },
    { crop: "Wheat", production: 5284188, area: 110 },
  ],
  Telangana: [
    { crop: "Banana", production: 602619, area: 23914 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 105672992, area: 10592 },
    { crop: "Jute", production: "", area: "" },
    { crop: "Maize", production: 31228434, area: 16073767 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 30559315, area: 9040744 },
    { crop: "Soyabean", production: 347817, area: 34170 },
    { crop: "Sugarcane", production: 69195676, area: 23842311 },
    { crop: "Wheat", production: 1962759, area: 1416622 },
  ],
  Tripura: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 23125, area: 17566 },
    { crop: "Jute", production: 64223, area: 7835 },
    { crop: "Maize", production: 50540, area: 45259 },
    { crop: "Potato", production: "", area: "" },
    { crop: "Rice", production: 513785, area: 27910 },
    { crop: "Soyabean", production: 10685011, area: 4288487 },
    { crop: "Sugarcane", production: "", area: "" },
    { crop: "Wheat", production: 820546, area: 16495 },
  ],
  "Uttar Pradesh": [
    { crop: "Banana", production: 809492, area: 19546 },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 30768, area: 79793 },
    { crop: "Jute", production: 105, area: 134 },
    { crop: "Maize", production: 22377151, area: 14998110 },
    { crop: "Potato", production: 192068401, area: 8622039 },
    { crop: "Rice", production: 218793359, area: 103380331 },
    { crop: "Soyabean", production: 247229, area: 312942 },
    { crop: "Sugarcane", production: 2202874890, area: 37469967 },
    { crop: "Wheat", production: 469911750, area: 168614377 },
  ],
  Uttarakhand: [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 607472, area: 421225 },
    { crop: "Jute", production: 2811721, area: 210770 },
    { crop: "Maize", production: 9195479, area: 4437218 },
    { crop: "Potato", production: 191586, area: 149859 },
    { crop: "Rice", production: 98902736, area: 1655588 },
    { crop: "Soyabean", production: 11632116, area: 5544511 },
    { crop: "Sugarcane", production: 123341110, area: 12419171 },
    { crop: "Wheat", production: "", area: "" },
  ],
  "West Bengal": [
    { crop: "Banana", production: "", area: "" },
    { crop: "Coconut", production: "", area: "" },
    { crop: "Cotton", production: 717841216, area: 304317 },
    { crop: "Jute", production: 117142, area: 54770 },
    { crop: "Maize", production: 147825671, area: 10798065 },
    { crop: "Potato", production: 4749814, area: 1353616 },
    { crop: "Rice", production: 154976910, area: 6433365 },
    { crop: "Soyabean", production: "", area: "" },
    { crop: "Sugarcane", production: 258092849, area: 101993454 },
    { crop: "Wheat", production: 7009, area: 10778 },
  ],
};

export default function CropLineChart() {
  const [selectedState, setSelectedState] = useState(
    Object.keys(statesData)[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleStateChange = (state) => {
    setSelectedState(state);
    setDropdownOpen(false);
  };

  const selectedStateData = statesData[selectedState];
  //    || [];

  return (
    <div className="linebg">
      <div style={{ textAlign: "center", color: "#333", padding: "20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Anta, sans-serif",
            fontWeight: "750",
            fontStyle: "normal",
          }}
        >
          Exploring Agricultural Data Across Indian States
        </h2>
        <h3
          style={{
            fontFamily: "Arial, sans-serif",
            margin: "20px 0",
            fontSize: "16px",
            color: "black",
            fontWeight: "200",
            lineHeight: "1.5",
            textAlign: "center",
            width: "100%",
            padding: "0 25px 0 25px",
          }}
        >
          Welcome to FIELDVISTA - An AgriTour, where we delve into the rich
          tapestry of agricultural diversity across various states in India.
          Agriculture is the backbone of the Indian economy, contributing
          significantly to livelihoods and sustenance. This platform aims to
          provide insights into the agricultural landscape, crop production, and
          farming practices in different states.
        </h3>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className="custom-dropdown">
            <div
              className={`dropdown-button ${dropdownOpen ? "open" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedState} &#x25BC;
            </div>
            {dropdownOpen && (
              <div className="dropdown-content">
                {Object.keys(statesData).map((state) => (
                  <div
                    key={state}
                    className="dropdown-item"
                    onClick={() => handleStateChange(state)}
                  >
                    {state}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="line-chart" style={{ width: "80%" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={selectedStateData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="production" fill="#8884d8" />
              <Bar dataKey="area" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Display selected state name */}
      <div
        style={{
          textAlign: "center",
          margin: "20px",
          fontSize: "34px",
          fontWeight: "bold",
          //   color: "#333",
          color: "brown",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {selectedState}
      </div>

      <div
        className="join-agri"
        style={{
          textAlign: "center",
          color: "#333",
          padding: "30px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontFamily: "Anta, sans-serif",
            fontWeight: "750",
            fontStyle: "normal",
            textDecoration: "underline",
            fontSize: "40px",
          }}
        >
          Join Us on the AgriTour
        </h3>
        <p style={{ padding: "20px", textAlign: "center", fontWeight: "500" }}>
          Embark on a journey through the heartlands of Indian agriculture with
          FIELDVISTA. Navigate through the interactive features, explore the
          nuances of each state's agricultural panorama, and contribute to the
          collective knowledge that shapes the future of farming in India. Dive
          into the wealth of agricultural data, and let FIELDVISTA be your guide
          to understanding the pulse of India's vibrant and diverse agricultur
        </p>
      </div>
    </div>
  );
}
