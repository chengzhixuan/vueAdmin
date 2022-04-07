import Mock from 'mockjs'
Mock.mock('/test/login', {
    code: 200,
    message: '成功',
    data: {
        'userName|1': Mock.Random.cname(),
        token: /\d{10,20}/,
    },
})
Mock.mock('/test/getPower', function() {
    return {
        code: 200,
        message: '成功',
        data: [],
    }
})