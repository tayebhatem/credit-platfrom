import * as z from "zod"

export const LoginSchema=z.object(
    {
        email:z.string().email(
            {
                message:'البريد الإلكتروني غير صالح'
            }
        ).min(1,{
            message:'البريد الالكتروني مطلوب'
        }),
        password:z.string().min(1,
           {
            message:"كلمة المرور مطلوبة"
           }
        ),
        
      
    }
)

export const RestSchema=z.object(
    {
        email:z.string().min(1,{
            message:'البريد الالكتروني مطلوب'
        }).email(
            {
                message:'البريد الإلكتروني غير صالح'
            }
        )
    }
)

export const AccountSchema=z.object(
    {
        name:z.string().min(1,{
            message:'الإسم الالكتروني مطلوب'
        }),
        phone:z.string().optional(),
        adress:z.string().optional()

    }
)
export const PasswordSchema=z.object(
    {
        password:z.string().min(6,
            {
                message:"Password should be 6 characters at least"
               }
        ),
        passwordConfirm:z.string().min(6,
            {
                message:"Password should be 6 characters at least"
               }
        )
    }
)
export const RegisterSchema=z.object(
    {
        name:z.string().min(1,{
            message:'الإسم مطلوب'
        }),
        email:z.string().email(
            {
                message:'البريد الإلكتروني غير صالح'
            }
        ).min(1,{
            message:'البريد الالكتروني مطلوب'
        }),
        password:z.string().min(1,
           {
            message:"كلمة المرور مطلوبة"
           }
        ),
        password2:z.string().min(1,
            {
                message:"كلمة المرور مطلوبة"
               }
        ),
        
    }
)

export const ConfirmCodeSchema = z.object({
    pin: z.string().min(6, {
      message: "Your code must be 6 numbers.",
    }),
  })

  export const ClientSchema=z.object(
    {
        name:z.string().min(1,{
            message:'الإسم  مطلوب'
        }),
        username:z.string().min(1,{
               message:'إسم المستخدم مطلوب'
        }),
        password:z.string().min(1,{
            message:' كلمة المرور مطلوبة'
     }),
        maxcredit:z.string().min(1,{
            message:'الحد الأقصى مطلوب'
        })

    }
)

export const ClientTransactionSchema=z.object(
    {
       
        username:z.string().min(1,{
            message:'إسم المستخدم مطلوب'
     }),
       
        amount:z.string().min(1,{
            message:'الحد الأقصى مطلوب'
        })

    }
)