const staticData = {
    companyList: [
        {
            id: 1,
            name: 'Jollibee Corporation',
            contactNo: "+63200199031",
            email: "jollibeecorp@email.com.ph",
            address: 'New York No. 1 Lake Park',
            transactions:[
                {
                    id: 1,
                    name: 'Bills Payment',
                    transactionDate: "May 01, 2021",
                    amount: "1000000",
                    referenceNo: 'RFNO-0001',
                    remarks: 'Bills Payment - Electricity Bill',
                    companyId: 1,
                    companyName: 'Jollibee Corporation',
                },
                {
                    id: 3,
                    name: 'Payroll Distribution',
                    transactionDate: "Oct 31, 2021",
                    amount: "15000000.00",
                    referenceNo: 'RFNO-779123',
                    remarks: 'Payroll',
                    companyId: 1,
                    companyName: 'Jollibee Corporation',
                }
            ]
        },
        {
            id: 2,
            name: 'San Miguel Corporation',
            contactNo: "+63233001293",
            email: "sanmiguel@email.com.ph",
            address: 'London No. 1 Lake Park',
            transactions:[
                {
                    id: 4,
                    name: 'Tax Payment',
                    transactionDate: "June 15, 2021",
                    amount: "7000000",
                    referenceNo: 'RFNO-00990123',
                    remarks: 'Tax',
                    companyId: 2,
                    companyName: 'San Miguel Corporation',
                } 
            ]
        },
        {
            id: 3,
            name: 'Procter & Gamble Philippines',
            contactNo: "+6329900991",
            email: "pandg@email.com.ph",
            address: 'Sidney No. 1 Lake Park',
            transactions: [
                {
                    id: 2,
                    name: 'Bills Payment',
                    transactionDate: "Apr 13, 2021",
                    amount: "5600000",
                    referenceNo: 'RFNO-0002',
                    remarks: 'Bills Payment - Water Bill',
                    companyId: 3,
                    companyName: 'Procter & Gamble Philippines',
                }
            ]
        }
    ],
    transactionList: [
        {
            id: 1,
            name: 'Bills Payment',
            transactionDate: "May 01, 2021",
            amount: "1000000",
            referenceNo: 'RFNO-0001',
            remarks: 'Bills Payment - Electricity Bill',
            companyId: 1,
            companyName: 'Jollibee Corporation',
        },
        {
            id: 2,
            name: 'Bills Payment',
            transactionDate: "Apr 13, 2021",
            amount: "5600000",
            referenceNo: 'RFNO-0002',
            remarks: 'Bills Payment - Water Bill',
            companyId: 3,
            companyName: 'Procter & Gamble Philippines',
        },
        {
            id: 3,
            name: 'Payroll Distribution',
            transactionDate: "Oct 31, 2021",
            amount: "15000000.00",
            referenceNo: 'RFNO-779123',
            remarks: 'Payroll',
            companyId: 1,
            companyName: 'Jollibee Corporation',
        },
        {
            id: 4,
            name: 'Tax Payment',
            transactionDate: "June 15, 2021",
            amount: "7000000",
            referenceNo: 'RFNO-00990123',
            remarks: 'Tax',
            companyId: 2,
            companyName: 'San Miguel Corporation',
        },
    ]
}

module.exports = staticData;