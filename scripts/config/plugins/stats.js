const fs = require("fs");
const path = require('path');

function StatsPlugin() {

};

StatsPlugin.prototype.apply = (compiler) => {
    compiler.plugin('done', (statsData, callback) => {
        const stats = statsData.toJson();
        fs.writeFileSync(path.join(__dirname, '../../../stats.json'), JSON.stringify(stats));
    });
};

module.exports = StatsPlugin;