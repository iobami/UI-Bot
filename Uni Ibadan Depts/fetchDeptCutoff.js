const tuitionFeesObject = require("./schoolFeeData");

const fetchCutoff = (dept_name, deptCutoff) => {

    let matchedDeptCutoff = [];

    deptCutoff.forEach((deptObject) => {
        if (deptObject.dept.toLowerCase() === dept_name.toLowerCase()) {
            matchedDeptCutoff.push(deptObject);
        }
    });

    return matchedDeptCutoff;
};

const fetchSchoolFees = (dept_name) => {

    const newReplyObject = [];

    tuitionFeesObject.forEach((deptObject) => {
        const naira = '\u{020A6}';
        if (deptObject.dept.toLowerCase() === dept_name.toLowerCase()) {
            deptObject.fees.freshers.forEach((level) => {
                Object.entries(level).forEach(([key, value]) => {
                    // const num = new Number(value).toLocaleString("en-GB");
                    const parsedNum = parseInt(value, 10);
                    const tuitionFee = parsedNum.toLocaleString("en-GB");
                    const resText = `For level ${key} FRESHERS in ${deptObject.dept}, ${deptObject.faculty}, the fee is ${naira} ${tuitionFee}`;
                    newReplyObject.push({ response_type: 'text', text: resText });
                });
            });
            deptObject.fees.returning.forEach((level) => {
                Object.entries(level).forEach(([key, value]) => {
                    // const num = new Number(value).toLocaleString("en-GB");
                    const parsedNum = parseInt(value, 10);
                    const tuitionFee = parsedNum.toLocaleString("en-GB");
                    const resText = `For level ${key} RETURNING students in ${deptObject.dept}, ${deptObject.faculty}, the fee is ${naira} ${tuitionFee}`;
                    newReplyObject.push({ response_type: 'text', text: resText });
                });
            });
        }
    });

    return newReplyObject;
};

module.exports = {
    fetchCutoff, fetchSchoolFees
};
