import product1Image from 'assets/img/products/tuthien1.jpg';
import product2Image from 'assets/img/products/tuthien2.jpg';
import product3Image from 'assets/img/products/tuthien3.jpg';
import product4Image from 'assets/img/products/tuthien4.png';
import product5Image from 'assets/img/products/tuthien5.png';
import product6Image from 'assets/img/products/tuthien6.jpg';

import user1Image from 'assets/img/users/100_1.jpg';
import user2Image from 'assets/img/users/100_2.jpg';
import user3Image from 'assets/img/users/100_3.jpg';
import user4Image from 'assets/img/users/100_4.jpg';
import user7Image from 'assets/img/users/100_7.jpg';
import user11Image from 'assets/img/users/100_11.jpg';
export const productsData = [
  {
    id: 1,
    image: product1Image,
    title: 'Người già neo đơn',
    description: 'Responsive admin template...',
    right: '36.000.000',
  },
  {
    id: 2,
    image: product2Image,
    title: 'Điều ước bất tử',
    description: 'Manage your schedule...',
    right: '60.000.000',
  },
  {
    id: 3,
    image: product3Image,
    title: 'Chuyện kể bé nghe',
    description: 'Realtime chat application...',
    right: '54.000.000',
  },
  {
    id: 4,
    image: product4Image,
    title: 'Em cần phẫu thuật',
    description: 'Over 100+ templates and pages...',
    right: '24.000.000',
  },
  {
    id: 5,
    image: product5Image,
    title: 'Lắng nghe cuộc sống',
    description: 'Over 30+ filter...',
    right: '40.000.000',
  },
  {
    id: 6,
    image: product6Image,
    title: 'Hạnh phúc bé nhỏ',
    description: 'Organize your schedule...',
    right: '32.000.000',
  },
];



export const userProgressTableData = [
  {
    avatar: user4Image,
    name: 'Hồng Phấn',
    date: '3 ngày trước',
  },
  {
    avatar: user2Image,
    name: 'Minh Thu',
    date: '1 tuần trước',
  },
  {
    avatar: user3Image,
    name: 'Minh Tú',
    date: '2 tuần trước',
  },
  {
    avatar: user1Image,
    name: 'Thanh Dương',
    date: '2 tuần trước',
  },
  {
    avatar: user7Image,
    name: 'Phượng Vũ',
    date: '1 tháng trước',
  },
  {
    avatar: user11Image,
    name: 'Hà My',
    date: '1 tháng trước',
  },
];

export const supportTicketsData = [
  {
    id: 1,
    avatar: user1Image,
    name: 'Sim',
    date: '30 mins ago',
    text:
      'Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy nibh euismod tinciduntut laoreet doloremagna aliquam erat volutpat.',
    status: 'pending',
  },
  {
    id: 2,
    avatar: user2Image,
    name: 'Jane',
    date: '1 hour ago',
    text:
      'Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy nibh euismod tinciduntut laoreet doloremagna aliquam erat volutpat.',
    status: 'open',
  },
  {
    id: 3,
    avatar: user3Image,
    name: 'Tom',
    date: 'yesterday',
    text:
      'Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy nibh euismod tinciduntut laoreet doloremagna aliquam erat volutpat.',
    status: 'closed',
  },
];

export const todosData = [
  { id: 1, title: 'task -1', done: true },
  { id: 2, title: 'task -2', done: false },
  { id: 3, title: 'task -3', done: true },
  { id: 4, title: 'task -4', done: true },
  { id: 5, title: 'task -5', done: false },
];

export const chartjs = {
  
  bar: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aut','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          label: 'Expense for this year',
          backgroundColor: '#545454',
          stack: 'Expense',
          data: [10000, 30000, 50000, 80000, 60000, 20000, 10000,2000,300,400,900,1700],
        },
        {
          label: 'Expense for last year',
          backgroundColor: '#ae1f17',
          stack: 'Expense',
          data: [30000, 80000, 50000, 100000, 60000, 40000, 90000,1000,100,100,500,1200],
        },
        {
          label: 'Expense for last year',
          backgroundColor: '#000000',
          stack: 'Expense',
          data: [30000, 80000, 50000, 100000, 60000, 40000, 90000,1000,100,100,500,1200],
        },
        {
          label: 'Expense for last year',
          backgroundColor: '#aaaaaa',
          stack: 'Expense',
          data: [30000, 80000, 50000, 100000, 60000, 40000, 90000,1000,100,100,500,1200],
        },
      ],
    },
    options: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked',
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            display: false,
          },
        ],
        yAxes: [
          {
            stacked: true,
            display: false,
          },
        ],
      },
    },
  },
  doughnut: {
    data: {
      datasets: [
        {
          data: [20, 30, 40, 50, 60],
          backgroundColor: [
            '#6a82fb',
            '#fc5c7d',
            '#45b649',
            '#00c9ff',
            '#ffd700',
          ],
          label: 'Dataset 1',
        },
      ],
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Doughnut Chart',
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  },
  line: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aut','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          label: 'Revenue for this year',
          borderColor: '#545454',
          backgroundColor: '#545454',
          
          data: [0, 1300, 2200, 3400, 4600, 3500, 3000,5000,6000,2000,8000,3000],
        },

        {
          label: 'Revenue for last year',
          borderColor: '#ae1f17',
          backgroundColor: '#ae1f17',
          data: [0, 1300, 2200, 3400, 4600, 3500, 3000,4000,2000,1000,6000,1500],
        },
        
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart - Stacked Area',
      },
      tooltips: {
        intersect: false,
        mode: 'nearest',
      },
      hover: {
        mode: 'index',
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: false,
              labelString: 'Month',
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: 'Value',
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  },
};
