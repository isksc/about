// const USER_ID = parseInt(Math.random() * 1000)
function generateTime() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const seconds = timeNow.getSeconds();
  let timeString = '' + hours;
  timeString += (minutes < 10 ? ':0' : ':') + minutes;
  timeString += (seconds < 10 ? ':0' : ':') + seconds;
  return timeString
}

const mockData = [
  { time: generateTime(), type: 'system', label: 'System', message: 'cd 做一个自由的打工人' },
  { time: generateTime(), type: 'system', label: 'System', message: 'Thanks for your visit, let me introduce myself.' },
  { time: generateTime(), type: 'info', label: 'Name', message: '你可以叫我山' },
  { time: generateTime(), type: 'info', label: 'Sex', message: '男' },
  { time: generateTime(), type: 'info', label: 'Age', message: '步入中年!' },
  { time: generateTime(), type: 'info', label: 'Aim: ', message: '希望自己能够做到如下目标:' },
  { time: generateTime(), type: 'system', label: '=> 1.', message: '做一个向上的人.' },
  { time: generateTime(), type: 'system', label: '=> 2.', message: '变得越来越好.' },
  //{ time: generateTime(), type: 'success', label: 'Done', message: 'Myself introduction is over!' }
]

const taskList = {
  echo: {
    description: 'Echoes input',
    echo(pushToList, input) {
      input = input.split(' ')
      input.splice(0, 1)
      const p = new Promise(resolve => {
        pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
        resolve({ type: 'success', label: '', message: '' })
      })
      return p
    }
  },
  defaultTask: {
    description: 'This is a default task aimed to show you the power of this project.',
    defaultTask(pushToList) {
      let i = 0;
      const p = new Promise(resolve => {
        const interval = setInterval(() => {
          mockData[i].time = generateTime()
          pushToList(mockData[i]);
          i++
          if (!mockData[i]) {
            clearInterval(interval)
            resolve({ type: 'success', label: 'Done', message: 'Myself introduction is over!' })
          }
        }, 500);
      })
      return p
    }
  },
  website: {
    description: 'Open Website in a new tab.',
    website() {
      const p = new Promise((resolve, reject) => {
        let url = 'https://www.shancn.com'
        window.open(url, '_blank')
        resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
      })
      return p;
    }
  },
  blog: {
    description: 'Open Blog in a new tab.',
    blog() {
      const p = new Promise((resolve, reject) => {
        let url = 'https://blog.shancn.com'
        window.open(url, '_blank')
        resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
      })
      return p;
    }
  },
  // open: {
  //   description: 'Open a specified url in a new tab.',
  //   open(pushToList, input) {
  //     const p = new Promise((resolve, reject) => {
  //       let url = input.split(' ')[1]
  //       if (!url) {
  //         reject({ type: 'error', label: 'Error', message: 'a url is required!' })
  //         return
  //       }
  //       pushToList({ type: 'success', label: 'Success', message: 'Opening' })

  //       if (input.split(' ')[1].indexOf('http') === -1) {
  //         url = 'http://' + input.split(' ')[1]
  //       }
  //       window.open(url, '_blank')
  //       resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
  //     })
  //     return p;
  //   }
  // }

}
