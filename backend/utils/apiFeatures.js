class ApiFeatures{
    constructor (query, queryStr){
        this.query = query;
        this.queryStr = queryStr;

    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i"
            }
        } 
        : {};
        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);


        // Filter for Rating and Price

        let queryStr1 = JSON.stringify(queryCopy);
        queryStr1 = queryStr1.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // console.log(queryCopy);
        // console.log(JSON.parse(queryStr1));

        this.query = this.query.find(JSON.parse(queryStr1));
        return this;
    }

    pagination(resultsPerPage){

        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultsPerPage * (currentPage-1);

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;