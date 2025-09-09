import  React,{useEffect,useRef,useState ,useDebugValue} from 'react';
import { Button, Slider } from 'antd'
import { testPost } from '@/api/course';

export interface IDashboardProps {
}

export default function Dashboard(props: IDashboardProps) {

  let [time  , settime] = useState<string | number>(10)
  let timers: React.RefObject<NodeJS.Timeout | null> = useRef(null);

  useEffect(() => {
    intervalFn()
  }, [])

  function intervalFn(){
    settime(5)
    clearInterval(timers.current as  NodeJS.Timeout)
    timers.current = setInterval(() => {
      settime((privde)=>{
      privde = typeof privde ==='string'?Number(privde):privde
        if(privde<=1){
          if(timers.current){
            clearInterval(timers.current)
          }
          return "time out!"
        }
        return (privde) - 1
      })
    }, 1000);
  }

  function resetfunction(){
    intervalFn()
  }

//   在React的class组件中,setState0)方法的第一个参数是更新后的state,第二个参数是更
// 新后的回调函数
// 但在function组件中,useState的第二个参数
// 不支持回调。
// 现在请实现一个usecallbackstate()方法,使
// 其支持state更新后执行回调函数

  function useCallbackState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<((val: T) => void) | null>(null);

  // 状态更新后执行回调
  useEffect(() => {
    callbackRef.current && callbackRef.current(state);
    callbackRef.current = null; // 执行后清空，避免重复调用
  }, [state]);

  // 自定义更新方法：接收新状态和回调
  const setWithCallback = (newState: T | ((prev: T) => T), callback?: (val: T) => void) => {
    callbackRef.current = callback || null;
    setState(newState);
  };
  return [state, setWithCallback] as const;
}
  const [count, setCount] = useCallbackState(0);

  useDebugValue('state',()=>'这是一个自定义数据')
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
      <Button type='primary' onClick={resetfunction}>
        reset
      </Button>
      <Slider></Slider>
      <Button type='primary' onClick={() => {
          // 更新时传入回调
          setCount(prev => prev + 1, (newCount) => {
            console.log('更新完成，当前值：', newCount);
            // 可在这里做DOM操作、发请求等
          });
        }}>
        调用{count}
      </Button>
    </div>
  );
}
