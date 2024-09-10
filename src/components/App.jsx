import { FeedbackOptions } from './Feedback/Feedback';
import { Statistics } from './Statistics/Statistics';
import commonCss from '../common-styles/common.module.css';
import { Component } from 'react';
import { TitleSection } from './TitleSection/TitleSection';
import { Notification } from './Notification/Notification';
class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  gettigFeedback = e => {
    const button = e.target.textContent.toLowerCase();
    Object.keys(this.state).map(
      el =>
        el === button &&
        this.setState(prevState => {
          return { [el]: prevState[el] + 1 };
        })
    );
  };
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;

    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    return `${total > 0 ? Math.floor((100 * this.state.good) / total) : 0} %`;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    return (
      <div className={commonCss.container}>
        <TitleSection title="Please leave Feedback">
          <FeedbackOptions
            onLeaveFeedback={this.gettigFeedback}
            options={options}
          />
        </TitleSection>
        <TitleSection title="Statistics">
          {!this.countTotalFeedback() ? (
            <Notification message="There is no feedback yet. Your feedback can be the first!" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positiveFeedback={this.countPositiveFeedbackPercentage()}
            />
          )}
        </TitleSection>
      </div>
    );
  }
}
export default App;
