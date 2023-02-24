import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let refsDate = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refsDate = selectedDates[0];
    console.log(refsDate);
    if (refsDate < options.defaultDate) {
      refs.startBtn.disabled = true;
      Report.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      Notify.success('Date is OK');
    }
  },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timer = refsDate - currentTime;

    if (timer < 1000) {
      clearInterval(intervalId);
      refs.startBtn.disabled = false;
      refs.input.disabled = false;
      Notify.info('The end');
      return
    }
    const timerComponent = convertMs(timer);
    // console.log(timerComponent);
    updateClockface(timerComponent);
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
