const temperatureUpdatedDate = date => {
  const toDoubleNum = num => {
    if (num.toString().length === 1) {
      return `0${num}`;
    }

    return num;
  };

  const d = new Date(date);
  const y = toDoubleNum(d.getFullYear());
  const m = toDoubleNum(d.getMonth() + 1);
  const dd = toDoubleNum(d.getDate());
  const h = toDoubleNum(d.getHours());
  const min = toDoubleNum(d.getMinutes());

  return `${dd}.${m}.${y} ${h}:${min}`;
};

export default function AppDate(props) {
  return <span>{temperatureUpdatedDate(props.date)}</span>;
}
