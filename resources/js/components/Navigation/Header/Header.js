import React, {Component} from 'react'
import classes from './Header.module.css'

export default class Header extends Component {
    render() {
        return (
            <div className={classes.Header}>
                <a href='/'>
                    <svg width="163" height="95" viewBox="0 0 163 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M45.2089 58.6617C48.0889 50.0217 51.8329 42.2457 56.1529 34.3257C57.7369 31.1577 52.9849 29.4297 50.6809 29.2857C50.3929 29.2857 50.2489 29.2857 50.1049 29.4297C45.4969 30.5817 35.4169 45.7017 32.3929 50.0217C31.9609 50.4537 31.8169 51.0297 31.6729 51.0297C31.6729 51.0297 31.8169 50.7417 31.9609 50.0217C35.4169 42.2457 39.5929 34.9017 43.1929 27.2697L43.3369 26.9817C44.0569 25.1097 44.0569 23.5257 42.7609 22.2297C41.7529 21.2217 39.7369 20.2137 38.1529 20.2137C38.0089 20.2137 37.5769 20.2137 37.4329 20.3577C35.4169 21.0777 11.3689 54.3417 8.77688 58.2297C12.6649 50.8857 16.5529 43.5417 20.5849 36.0537C21.3049 34.6137 21.8809 34.0377 20.8729 32.5977L20.5849 32.4537C19.2889 31.0137 17.5609 30.4377 15.5449 30.4377C13.5289 30.4377 12.3769 30.8697 11.5129 32.7417C6.32888 43.8297 5.17688 45.5577 1.00087 57.2217C0.280875 59.5257 -0.295125 62.1177 1.28887 64.1337C2.29688 65.2857 5.17688 67.0137 6.76088 66.8697C7.62488 66.8697 8.63288 64.7097 9.20888 63.9897C16.4089 53.0457 24.3289 42.2457 32.3929 32.1657C29.0809 38.0697 26.4889 43.6857 24.6169 49.4457C24.0409 51.6057 23.4649 54.1977 24.4729 56.5017C24.9049 57.9417 26.6329 59.8137 28.2169 59.9577C29.0809 59.8137 29.3689 59.3817 29.6569 58.9497C34.5529 51.8937 39.7369 45.2697 44.9209 38.5017C45.2089 38.2137 45.3529 37.7817 45.3529 37.7817C45.4969 37.7817 45.3529 38.2137 45.0649 38.6457C42.4729 44.6937 40.0249 50.7417 38.5849 57.2217C38.1529 59.3817 38.1529 62.6937 40.4569 64.2777C41.3209 64.7097 42.0409 65.1417 42.9049 65.1417C51.4009 65.1417 64.0729 46.8537 68.9689 39.3657C68.6809 38.3577 68.2489 37.7817 67.6729 37.7817C67.5289 37.7817 67.3849 37.7817 67.2409 38.0697C66.9529 38.3577 64.3609 41.9577 61.3369 45.9897C59.6089 48.1497 48.5209 61.2537 45.3529 61.2537C44.9209 61.2537 44.7769 60.6777 45.2089 59.0937V58.6617ZM52.9579 94.9497C54.2539 94.9497 55.8379 94.5177 57.2779 94.2297C73.5499 89.6217 85.7899 53.3337 90.9739 41.5257C92.2699 38.6457 93.5659 35.6217 94.8619 32.8857C96.0139 29.8617 92.5579 28.8537 90.2539 28.8537C89.1019 28.8537 87.9499 28.9977 87.5179 30.1497C84.0619 36.7737 68.0779 64.5657 63.6139 64.4217C60.0139 64.2777 67.5019 48.0057 68.2219 46.5657C70.3819 42.1017 73.4059 36.1977 76.5739 32.7417C77.4379 31.8777 77.7259 31.3017 77.0059 30.1497C76.1419 28.1336 74.1259 27.2697 71.9659 27.2697C70.9579 27.2697 70.3819 27.9897 69.8059 28.8537C63.9019 36.0537 56.5579 51.6057 57.1339 60.9657C57.2779 64.4217 59.0059 68.1657 63.1819 68.3097C68.9419 68.5977 76.7179 53.3337 79.4539 49.1577C73.2619 64.9977 62.6059 89.9097 50.6539 89.9097C45.9019 89.9097 44.4619 86.4537 43.8859 82.4217C43.7419 81.4137 43.4539 80.8377 42.5899 80.6937C41.5819 80.4057 41.8699 81.8457 42.0139 82.5657C42.7339 88.9017 45.7579 94.9497 52.9579 94.9497ZM98.2178 67.1577C99.0818 67.1577 99.5138 66.8697 99.9458 66.0057C102.106 61.9737 106.282 54.1977 111.61 46.1337C109.882 53.3337 108.73 60.9657 109.018 63.5577C109.45 67.4457 110.314 71.4777 115.066 71.4777C115.93 71.4777 116.506 71.1897 116.938 70.1817C120.97 60.9657 138.106 26.2617 145.882 22.8056C147.61 22.3737 146.458 20.3577 144.154 20.3577C143.146 20.3577 141.706 21.0777 140.266 22.5177C130.906 31.3017 117.946 60.2457 115.354 64.4217C115.498 53.3337 118.954 43.1097 123.274 32.8857C123.562 32.0217 123.418 31.8777 122.554 31.1577C121.258 30.4377 120.106 30.1497 119.098 30.1497C116.938 30.1497 115.786 32.3097 115.21 34.0377C108.01 43.6857 100.378 57.9417 98.5058 60.6777C101.386 46.7097 105.85 35.0457 109.882 31.4457C109.882 31.4457 108.01 29.5737 105.706 29.5737C103.978 29.5737 101.962 30.5817 99.9458 33.7497C96.0578 40.5177 91.4497 55.2057 92.7458 62.4057C93.1778 65.2857 95.1938 67.1577 98.2178 67.1577ZM157.803 37.7817C157.803 37.7817 157.659 37.7817 157.515 38.0697C151.611 46.1337 145.563 54.3417 137.643 60.5337C136.635 61.1097 136.203 61.3977 135.627 61.3977C135.483 61.3977 135.483 61.3977 135.339 61.2537C133.467 60.2457 137.643 52.0377 138.219 50.7417C141.099 44.9817 144.555 38.7897 148.011 33.6057L148.155 33.3177C149.739 30.4377 146.715 28.8537 144.555 27.8457C143.691 27.5577 143.115 27.2697 142.683 27.2697C140.235 27.2697 130.155 51.3177 128.715 54.7737C126.843 59.8137 130.443 64.7097 134.475 64.7097C140.235 64.7097 151.899 50.0217 155.211 45.4137C156.363 43.3977 157.803 41.3817 159.243 39.3657C158.955 38.3577 158.523 37.7817 157.803 37.7817ZM157.803 0.48565C157.227 0.48565 156.939 0.77365 156.219 1.63765C152.475 6.82165 147.579 17.1897 148.299 23.8136C148.443 24.6777 148.731 25.1097 148.875 25.1097C149.019 25.1097 149.163 24.8217 149.595 24.2457C153.771 18.1977 157.659 12.0057 161.979 6.10165C162.267 5.52565 163.131 4.80565 162.699 3.94165C162.123 2.21365 159.963 0.48565 157.803 0.48565Z"
                            fill="#F2523A"/>
                    </svg>
                </a>
            </div>
        )
    }
}
