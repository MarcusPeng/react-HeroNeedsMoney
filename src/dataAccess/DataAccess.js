class DataAccess {
	constructor() {
		this.getData = () => {
			let data = localStorage.getItem("HeroNeedsMoney");
			if (data !== null) {
				data = JSON.parse(data);
			}

			return data;
		}

		this.setData = (data) => {
			localStorage.setItem("HeroNeedsMoney", JSON.stringify(data));
		}

		this.dataTemplate = {targetMoney: "0", bossHp:"0", actionPoint: "0", inputLog: []};

		const data = this.getData();
		if (data === null) {
			this.setData(this.dataTemplate);
		}
	}

	initialData() {
		this.setData(this.dataTemplate);
	}

	isSetTargetMoney() {
		return this.getData().targetMoney !== "0";
	}

	setTargetMoney(targetMoney) {
		let data = this.getData();
		data.targetMoney = targetMoney;
		data.bossHp = targetMoney;
		this.setData(data);
	}

	setActionPoint(actionPoint) {
		let data = this.getData();
		data.actionPoint = actionPoint;
		this.setData(data);
	}

	setBossHp(bossHp) {
		let data = this.getData();
		data.bossHp = bossHp;
		this.setData(data);
	}

	addInput(inputItem) {
		let data = this.getData();
		data.inputLog.push(inputItem);
		this.setData(data);
	}

	getTargetMoney() {
		return this.getData().targetMoney;
	}

	getInputLog() {
		return this.getData().inputLog;
	}

	getActionPoint() {
		return this.getData().actionPoint;
	}

	getBossHp() {
		return this.getData().bossHp;
	}
}

export default DataAccess;