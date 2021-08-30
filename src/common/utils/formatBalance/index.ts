const formatBalance = (balance: number) => Math.floor(balance * 10 ** 6) / 10 ** 6

export default formatBalance
