const eventSource = new EventSource('/notification/sse');
eventSource.onmessage = ({ data }) => {
  const message = document.createElement('li');
  message.innerText = 'New message: ' + data;
  document.body.appendChild(message);
  // const noti = new Notification('Equipment Created', {
  //     body: message,
  //     icon: 'https://www.studytonight.com/css/resource.v2/icons/studytonight/st-icon-dark.png'
  // });
};
