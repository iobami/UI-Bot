let matchedDeptCutoff = [];

const fetchCutoff = (dept_name, deptCutoff) => {

    deptCutoff.forEach((deptObject) => {
        if (deptObject.dept.toLowerCase() === dept_name.toLowerCase()) {
            matchedDeptCutoff.push(deptObject);
        }
    });

    return matchedDeptCutoff;
};

module.exports = {
    fetchCutoff,
};
