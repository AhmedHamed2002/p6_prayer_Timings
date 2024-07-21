import Prayer from "./Prayer";
import "../css/mainContent.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/dist/locale/ar-ly";
moment.locale("ar-ly");

export default function MainCountent() {

const [timings, setTimings] = useState([]);
const [city, setCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
});
const [today, setToday] = useState("");
const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
const [remainingTime, setRemainingTime] = useState("");

const avilableCities = [
    {
    displayName: "القاهرة",
    apiName: "Cairo",
    },
    {
    displayName: "الاسكندرية",
    apiName: "Alexandria",
    },
    {
    displayName: "طنطا",
    apiName: "Tanta",
    },
    {
    displayName: "بور سعيد",
    apiName: "Port Said",
    },
    {
    displayName: "بور فؤاد",
    apiName: "Port Fouad",
    },
    {
    displayName: "اسوان",
    apiName: "Aswan",
    },
    {
    displayName: "قنا",
    apiName: "Qena",
    },
    {
    displayName: "سوهاج",
    apiName: "Sohag",
    },
    {
    displayName: "الاقصر",
    apiName: "Luxor",
    },
    {
    displayName: "دمياط",
    apiName: "Damietta",
    },
    {
    displayName: "دمنهور",
    apiName: "Damanhour",
    },
    {
    displayName: "ايتاى البارود",
    apiName: "Itay AlBaroud",
    },
    {
    displayName: "بنها",
    apiName: "Banha",
    },
    {
    displayName: "الجيزة",
    apiName: "Giza",
    },
    {
    displayName: "المنصورة",
    apiName: "Mansouro",
    },
    {
    displayName: "المحله",
    apiName: "Elmahalla",
    },
    {
    displayName: "سيناء",
    apiName: "Shibh Jazirat Sina",
    },
    {
    displayName: "كفر الزيات",
    apiName: "Kafr ElZayat",
    },
    {
    displayName: "كفر الشيخ",
    apiName: "Kafr ElSheikh",
    },
    {
    displayName: "كفر الدوار",
    apiName: "Kafr Eldawar",
    },
    {
    displayName: "الإسماعيلية",
    apiName: "Ismailia",
    },
    {
    displayName: "مطروح",
    apiName: "Matrouh",
    },
    {
    displayName: "الفيوم",
    apiName: "Fayyum",
    },
    {
    displayName: "شبين الكوم",
    apiName: "Shibin Elkom",
    },
    {
    displayName: "منوف",
    apiName: "Menouf",
    },
    {
    displayName: "زفتى",
    apiName: "Zefta",
    },
    {
    displayName: "بسيون",
    apiName: "Basyoun",
    },
    {
    displayName: "السويس",
    apiName: "Suez",
    },
    {
    displayName: "العريش",
    apiName: "Arish",
    },
    {
    displayName: "الزقازيق",
    apiName: "Zagazig",
    },
    {
    displayName: "الإسماعيلية",
    apiName: "Ismailia",
    },
    {
    displayName: "ابو كبير",
    apiName: "Abu Kabir",
    },
    {
    displayName: "بنى سويف" ,
    apiName: "Beni Suef",
    },
];
const prayerArray = [
    {
    key: "Fajr",
    displayName: "الفجر",
    },
    {
    key: "Dhuhr",
    displayName: "الظهر",
    },
    {
    key: "Asr",
    displayName: "العصر",
    },
    {
    key: "Maghrib",
    displayName: "المغرب",
    },
    {
    key: "Isha",
    displayName: "العشاء",
},
];

const getTimings = async () => {
    const res = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city.apiName}`
    );
    setTimings(res.data.data.timings);
};

useEffect(()=>{ 
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-warning me-3",
            cancelButton: "btn btn-secondary text-warning"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `هل صليت`,
        text: "الصلاه هى اول  ما اوجبه الله من العبادات",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "تقبل الله",
                text: "الصلاة عمود الاسلام",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "قم للصلاة",
                text: "الصلاة فى وقتها",
                icon: "error"
            });
        }
    });
} ,[]); 

useEffect(() => {
    getTimings();
}, [city]);

useEffect(() => {
    let interval = setInterval(() => {
        const t = moment();
        setToday(t.format("MMM  Do YYYY | dddd | hh:mm:ss a"));
        setupCountdownTimer();
    }, 1000);
    
    return () => {
        clearInterval(interval);
    };
}, [timings]);


const Change = (e) => {
    const cityObject = avilableCities.find((city) => {
    if (city.apiName == e.target.value) return city;
    });
    setCity(cityObject);
};

const setupCountdownTimer = () => {
    const momentNow = moment();
    let PrayerIndex = 0;

    if (
    momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
    momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
    // console.log("Dhuhr");
    PrayerIndex = 1;
    } else if (
    momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
    momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
    // console.log("Asr");
    PrayerIndex = 2; 
    } else if (
    momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
    momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
    // console.log("Maghrib");
    PrayerIndex = 3;
    } else if (
    momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
    momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
    // console.log("Isha");
    PrayerIndex = 4;
    } else {
    // console.log("Fajr");
    PrayerIndex = 0;
    }
    setNextPrayerIndex(PrayerIndex);

    const nextPrayerObject = prayerArray[PrayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
    const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
    const fajrToMidnightDiff = nextPrayerTimeMoment().diff(moment("00:00:00", "hh:mm:ss"));
    let totalDiff = midnightDiff + fajrToMidnightDiff;
    remainingTime = totalDiff;
}

    const durationTime = moment.duration(remainingTime);
    setRemainingTime(`${durationTime.hours()}:${durationTime.minutes()}:${durationTime.seconds()}`);
};

return (
    <>
    <div className="container p-5">
        <div
        className="row border-bottom border-dark pb-3 "
        style={{ color: "goldenrod", fontFamily: "Fustat" }}
        >
        <div className="col-6 text-end">
            <h2 className="fs-5">{today}</h2>
            <h1>{city.displayName}</h1>
        </div>
        <div className="col-6 text-start">
            <h2 className="fs-6">
            {" "}
            متبقى حتى صلاة {prayerArray[nextPrayerIndex].displayName}{" "}
            </h2>
            <h1 style={{ color: "rgb(0, 119, 136)" }}> {remainingTime}</h1>
        </div>
        </div>

        <div className="row p-4 mt-4">
        <Prayer
            name="الفجر"
            image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYD-E8B38AqS-wiDc8J0ZIwBf11RG0YLltqw&s"
            }
            time={timings.Fajr}
        />
        <Prayer
            name="الظهر"
            image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVc9qadq0Yx6GT9fUYvqNoREJQA3Bmit2VWA&s"
            }
            time={timings.Dhuhr}
        />
        <Prayer
            name="العصر"
            image={
            "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202312/up-mosque-213203257-3x4.png?VersionId=FXmA0gtyNbG1w3_V1SDOuJN6xfjBkgbC"
            }
            time={timings.Asr}
        />
        <Prayer
            name="المغرب"
            image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaFHAGywcGf9EjPGIf13ApFO3BsiXb9nATAg&s"
            }
            time={timings.Maghrib}
        />
        <Prayer
            name="العشاء"
            image={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCgwkgf4d6tYuZRE2NCAy5Io1_Ls84juDrQ&s"
            }
            time={timings.Isha}
        />
        </div>

        <select
        className="form-select w-50 mx-auto"
        onChange={Change}
        style={{ color: "goldenrod" }}
        aria-label="Default select example"
        >
        {avilableCities.map((info) => {
            return (
            <>
                <option value={info.apiName} key={info.apiName}>
                {info.displayName}
                </option>
            </>
            );
        })}
        </select>
    </div>
    </>
);
}
