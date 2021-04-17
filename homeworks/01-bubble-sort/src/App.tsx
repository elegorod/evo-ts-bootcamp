import React from 'react';
import styles from './App.module.css';
import Graph from './Graph';
import Sorter from './Sorter';

const VALUE_COUNT = 30;
const MIN_VALUE = 2;
const MAX_VALUE = 400;

interface Props {
}

interface State {
  values: number[]
  active: number[]
  firstSorted?: number
  status: Status
}

enum Status {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Paused = "Paused",
  Finished = "Finished"
}
const StatusDisplayName = new Map<Status, string>();
StatusDisplayName.set(Status.NotStarted, "Not started");
StatusDisplayName.set(Status.InProgress, "In progress");
StatusDisplayName.set(Status.Paused, "Paused");
StatusDisplayName.set(Status.Finished, "Finished");

class App extends React.Component<Props, State> {

  sorter = new Sorter(this.tickCallback.bind(this))

  constructor(props: Props) {
    super(props)
    const newValues = this.generateValues()
    this.state = {
      values: newValues,
      status: Status.NotStarted,
      active: []
    }
    this.sorter.reset(newValues)
  }

  generateValues() {
    const result = []
    for (let i = 0; i < VALUE_COUNT; i++) {
      result.push(MIN_VALUE + Math.random() * (MAX_VALUE - MIN_VALUE))
    }
    return result;
  }

  handleReset() {
    const newValues = this.generateValues()
    this.setState({
      values: newValues,
      status: Status.NotStarted,
      active: [],
      firstSorted: undefined
    })
    this.sorter.reset(newValues)
  }

  handleStart() {
    this.setState({
      status: Status.InProgress
    })
    this.sorter.start()
  }

  handlePause() {
    const newStatus = this.state.status === Status.InProgress ? Status.Paused : Status.InProgress
    this.setState({
      status: newStatus
    })
    this.sorter.setPaused(newStatus === Status.Paused)
  }

  tickCallback(values: number[], finished: boolean, active: number[], firstSorted: number) {
    this.setState({
      values: values,
      status: finished ? Status.Finished : this.state.status,
      active: active,
      firstSorted: firstSorted
    })
  }

  render() {
    const status = this.state.status
    return (
      <div className={styles.app}>
        <header>
          <h2>Bubble sort</h2>
        </header>
        <Graph values={this.state.values} active={this.state.active} firstSorted={this.state.firstSorted} />
        <div className={styles.buttonPanel}>
          <button onClick={this.handleReset.bind(this)}>Reset</button>
          {status === Status.NotStarted ?
            <button onClick={this.handleStart.bind(this)}>Start</button>
            :
            <button onClick={this.handlePause.bind(this)}
              disabled={status === Status.Finished}>
              {status === Status.Paused ? "Resume" : "Pause"}
            </button>
          }
        </div>
        <div className={styles.status}>
          {StatusDisplayName.get(status)}
        </div>
      </div>
    );
  }

}

export default App;
