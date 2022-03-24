//import the Payment model
import { Payment } from "../../db/models/";

/**
 *
 * function to create payment
 *  
 */

export async function createPayment(req, res, next) {
    try {
        //get the request data
        const { monto,userId } = req.body;

        //create the payment 
        let newPayment = await Payment.create({
            userId,
            monto,
        });
        //evaluate if was created the payment
        if (newPayment) {
            //success case
            res.json({
                code: 1000,
                message: "success",
                data: {
                    payment: newPayment,
                },
            });
        } else {
            throw new Error("Cannot create record");
        }
    } catch (e) {
        //wrong case return error
        //console.log(e);
        res.status(500).json({
            code: 2000,
            message: "Something goes wrong" + e,
            data: {},
        });
    }
}

/**
 *
 * function to get all payments
 *
 */
export async function getPayments(req, res) {
    try {
        //Get all payments
        let payments = await Payment.findAll();

        //evaluate if there were records
        if (payments.length !== 0) {
            //success
            res.json({
                code: 1000,
                message: "Success",
                data: payments,
            });
        } else {
            //There is not records
            res.json({
                code: 1000,
                message: "There is not payment",
                data: [],
            });
        }
    } catch (e) {
        //wrong case return error
        res.status(500).json({
            code: 2000,
            message: "Something goes wrong: " + e,
            data: {},
        });
    }
}
