import Counter from 'components/Counter';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as counterActions } from 'store/modules/counter';
import { StoreState } from 'store/modules';

// connect() 함수로 인해서 루트 컴포넌트의 Provider에서
// 념겨받을 Props의 형태를 정해줘야 한다
interface Props {
  value: number;
  CounterActions: typeof counterActions;
}

class CounterContainer extends React.Component<Props> {
  onIncrement = () => {
    const { CounterActions } = this.props;
    CounterActions.increment();
  };
  onDecrement = () => {
    const { CounterActions } = this.props;
    CounterActions.decrement();
  };
  render() {
    const { onIncrement, onDecrement } = this;
    const { value } = this.props;
    return (
      <Counter
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        value={value}
      />
    );
  }
}

// 스토어에 있는 그 많은 상태 데이터들 중에 하나를 받아야 한다.
// 우리는 그 것들 중에 counter를 얻어오기 위해 아래와 같이 한다.
export default connect(
  ({ counter }: StoreState) => ({
    value: counter.value
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
  })
)(CounterContainer);
