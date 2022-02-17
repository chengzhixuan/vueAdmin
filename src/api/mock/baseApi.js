import Mock from 'mockjs'
Mock.mock('/test/login', {
    'list|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL'
    }]
})