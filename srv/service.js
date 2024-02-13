const cds = require('@sap/cds');
const { error } = require('console');
module.exports = cds.service.impl(async function () {
    let {
 tab1,tab2
    } = this.entities;
    const c5re = await cds.connect.to('iflow1');
    var data_recieved = true;

    if(data_recieved = false){
   this.before('READ', tab1, async (req) => { //debugger
        try {
            const resp = await c5re.get('/odata/v4/ms/table1');
            console.log(resp);
            let data = [];
            // resp.data.forEach(dat =>{
                // data.push({
                //     id   :  resp.value[0].id,
                //     customerName : resp.value[0].customerName,
                // })
            // });

             resp.value.forEach(dat =>{
                data.push({
                    id   :  dat.id,
                    customerName : dat.customerName,
                })
            });
        
            // await DELETE.from(tab1);
            await INSERT.into(tab1).entries(data);
            // return data;
        

        } catch (error) {
            req.error(500, error.message);
        }

    });
}     
            this.on('POST', tab1, async (req) => {
                debugger
                try {
                    body = {
                        id : req.data.id,
                         customerName  : req.data.customerName,
                         IsActiveEntity: true
                    }
                    const createdEntity = await INSERT.into(tab1).entries(req.data);
                    const resp2 = await c5re.post('/odata/v4/ms/table1', body);
                    return req.data;
                
                    // this.before('READ', tab1, async (req) => {
                    //     //     // Fetch data from the database
                    //         const data2 = await cds.tx(req).run(SELECT.from(tab1));
                    // });
        
        } catch (error) {
            req.error(500, error.message);
        }
    });


    this.on('DELETE', tab1, async (req) => {
        debugger
        try {
            const { id } = req.data;
    
            // Delete entry from tab1
            await DELETE.from(tab1).where({ id });
    
            // Delete corresponding entry from external service
            // Replace '/table1' with the appropriate endpoint in your external service
            // const resp = await c5re.delete(`/odata/v4/ms/table1/${id}`);

            const resp = await c5re.delete(`/odata/v4/ms/table1/id`);
        } catch (error) {
            req.error(500, error.message);
        }
    });

    

    // this.on('UPDATE', tab1, async (req) => {
    //     debugger
    //     try {
    //         const { id, customerName, PoNumber, customerNumber, orderDate } = req.data;
    
    //         // Update entry in tab1
    //        const ud = await UPDATE(tab1).set({ customerName: customerName, PoNumber: PoNumber, customerNumber: customerNumber, orderDate: orderDate}).where({ id : id });
    //        if(!ud){
    //         throw new error('error ud');
    //        } 
    //        console.log(req.data);
    //         // await UPDATE(tab1).set({ customerName: customerName  }).where({ id : id });
    //         // await INSERT.into(tab2).entries(req.data);
    //         // Update corresponding entry in external service
    //         // Replace '/table1' with the appropriate endpoint in your external service
    //         // const resp = await c5re.patch(`/table1/${id}`, { customerName });
    //     } catch (error) {
    //         req.error(500, error.message);
    //     }
    // });

    this.on('UPDATE', tab1, async (req) => {
        debugger
        try {
            const { id, customerName, PoNumber, customerNumber, orderDate } = req.data;
            // Update entry in tab1
            const updatedRows = await UPDATE(tab1)
                .set({ customerName, PoNumber, customerNumber, orderDate })
                .where({ id });

                const updateUrl = `/odata/v4/ms/table1(id=${req.data.id})`;
    
                //         // Update the college analytics API
                //         // await c5re.put(updateUrl, body);
                //         await c5re.put(`/odata/v4/my/collegeAnalytics(${collegeId})`, body)

                // const resp = await c5re.put(`/odata/v4/ms/table1(${id})`,
                const resp = await c5re.put(updateUrl,
                 { customerName:customerName, PoNumber:PoNumber, customerNumber:customerNumber, orderDate:orderDate });
    
            if (updatedRows === null) {
                throw new Error('No rows were updated');
            } 
            // console.log('Updated data:', req.data);
    
            // Optionally, you can perform additional logic here
    
            // Return a success response
            // return { success: true };
            return req.data;
        } catch (error) {
            console.error('Error updating data:', error);
            req.error(500, error.message);
        }
    });
    
});
// this.on('POST', tab1, async (req) => {
//     try {
//         const { ID, customerName } = req.data;
//         const body = { ID, customerName };

//         // Insert new entry into tab1
//         await INSERT.into(tab1).entries(body);

//         // Create new entry in external service
//         // const resp2 = await c5re.post('/table1', body);
//     } catch (error) {
//         req.error(500, error.message);
//     }
// });
// });