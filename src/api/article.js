import axios from './axios';
export default {
	/**
	 * 添加修改文章
	 * @param {*} id
	 * @param {*} cids 类目di
	 * @param {*} title  标题
	 * @param {*} mark 关键词
	 * @param {*} desc 描述
	 * @param {*} level 等级
	 * @param {*} ishide 是否可以搜索
	 * @param {*} isHot 热门
	 * @param {*} recommend 推荐
	 * @param {*} context 内容
	 * @param {*} family 老帮助中心展示地方
	 * @param {*} type 平台
	 * @returns
	 */
	addArticle(id, cids, title, mark, desc, level, ishide, isHot, recommend, context, family, type = -1) {
		return new Promise((resolve, reject) => {
			// prettier-ignore
			axios({
				method: 'POST',
				url: '/cmjc1/jiaocheng',
				params: {
					method: 'save',
				},
				data: {
					id,
					cids,
					title,
					mark,
					desc,
					level,
					ishide,
					isHot,
					recommend,
					context,
					family,
					type
				},
			}).then((res) => {
				resolve(res.data);
			}).catch((err) => {
				reject(err);
			});
		});
	},
	/**
	 * 教程中心列表
	 * @param {*} cid 二级类目id
	 * @param {*} isHot 是否热门 1热门  0非热门  空：所有
	 * @param {*} orderBy 0:修改时间倒序 1：正序
	 * @param {*} size
	 * @param {*} page
	 * @param {*} family  归属平台
	 * @param {*} type  平台
	 * @returns
	 */
	getArticleList(cid, isHot, orderBy = 0, content, size = 10, page = 1, isAdmin = 1, family = '', type = '') {
		return new Promise((resolve, reject) => {
			axios({
				method: 'GET',
				url: '/cmjc1/jiaocheng',
				params: {
					method: 'queryList',
					cid,
					isHot,
					orderBy,
					content,
					size,
					page,
					isAdmin,
					family,
					type
				},
			}).then((res) => {
				resolve(res.data);
			}).catch((err) => {
				reject(err);
			});
		});
	},
	/**
	 * 获取文章详情
	 * @param {*} id
	 * @returns
	 */
	getArticle(id) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'GET',
				url: '/cmjc1/jiaocheng',
				params: {
					method: 'detail',
					id: id,
				},
			})
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	/**
	 * 删除文章
	 * @param id
	 * @returns {Promise}
	 */
	delArticle(id) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'GET',
				url: '/cmjc1/jiaocheng',
				params: {
					method: 'delete',
					id: id,
				},
			}).then((res) => {
				resolve(res.data);
			}).catch((err) => {
				reject(err);
			});
		});
	},
	/**
	 * 获取热门文章数
	 * @returns
	 */
	getHotNum() {
		return new Promise((resolve, reject) => {
			axios({
				method: 'GET',
				url: '/cmjc1/jiaocheng',
				params: {
					method: 'getJcCountByHot',
				},
			})
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
};