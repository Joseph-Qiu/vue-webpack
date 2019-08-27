#!/bin/bash
outPut="dist"

# 计时开始
performanceStart() {
	timeStart=`date +%s`
}

# 计时结束
performanceEnd() {
	timeEnd=`date +%s`
	second=`expr $timeEnd - $timeStart`
	echo "packing done, total time ${second}s"
}

createFolder() {
	if [ ! -d ${1} ]
	then
		mkdir ${1}
	fi
}

deleteFolder() {
	if [ -d ${1} ]
	then
		rm -rf ./${1}
	fi
}

# 开发，测试环境, 拷贝html目录到静态目录
copyHtml() {
    ##deleteFolder scripts/templates/www
	cp -r static scripts/templates/www
}

clear() {
	deleteFolder ${outPut}
	rm -rf *.tgz
}

generateCompressName() {
	day=`date +%Y%m%d`
	if [ x$1 == xtest ]
	then
		echo $2
	else
		echo "front-${outPut}-${day}${2}"
	fi
}

compress() {
    tar zcf ${1}.tgz ${1}
}

#################################辅助命令####################################################
if [ $1 == "compress" ]
then
    compress $2
fi

#################################运行命令####################################################
if [ $1 == "dev" ]
then
	copyHtml
	node scripts/build/conf.js $1 ${2} ${3}
	node scripts/build/html.js
	npm run dev
fi

if [ $1 == "test" ]
then
	performanceStart
	day=`date +%Y%m%d`
	clear
	copyHtml
	node scripts/build/conf.js $1 ${2} ${3}
	npm run build
    sleep 1
    node scripts/build/html.js
	performanceEnd
fi

if [ $1 == "product" ]
then
	performanceStart
	day=`date +%Y%m%d`
	clear
	copyHtml
	node scripts/build/conf.js $1 ${2} ${3}
	npm run build
    sleep 1
    node scripts/build/html.js
	performanceEnd
fi