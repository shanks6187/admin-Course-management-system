import * as React from 'react';
import { Button, Slider } from 'antd'
import { testPost } from '@/api/course';

export interface IDashboardProps {
}

export default function Dashboard(props: IDashboardProps) {
  let [time, settime] = React.useState(10)
  React.useEffect(() => {
    let timers: any = null
    timers = setInterval(() => {
      settime(time => time - 1)
      if (time < 1) {
        console.log('12');
        clearInterval(timers)
      }
    }, 1000);
  }, [])
  return (
    <div>
      数据分析
      <Button type="primary" onClick={
        () => {
          testPost().then(res => {
            console.log(res);
          })
        }}>点击按钮</Button>
      <br></br>
      <div>倒计时:{time}</div>
      <br></br>
      <Button type='primary'>
        reset
      </Button>
      {/* <Slider></Slider> */}
    </div>
  );
}
