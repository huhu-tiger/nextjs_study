import CountUI from '../../components/Count'
import { increment, decrement, incrementAsync } from '../../components/store/action'
import { connect } from 'react-redux'

// 映射状态到 props
const mapStateToProps = (state) => {
    console.log(state)
    return {
        count: state
    }
}
// 映射dispatch到 props
// const mapDispatchToProps = (dispatch) => (
//     {
//         dispatchIncrement: (number) => dispatch(increment(number)),
//         dispatchDecrement: (number) => dispatch(decrement(number)),
//         dispatchIncrementAsync: (number, time) => dispatch(incrementAsync(number, time))
//     })

// 简写mapDispatchToProps,dispatch 是 store 的 dispatch,自动添加到 props 中
const mapDispatchToProps = {
    dispatchIncrement: increment,
    dispatchDecrement: decrement,
    dispatchIncrementAsync: incrementAsync
}
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)