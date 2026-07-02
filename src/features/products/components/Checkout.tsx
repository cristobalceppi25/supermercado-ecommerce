import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { validate } from "rut.js"
import { regions, communes, provinces } from "@clregions/data/array"
import { z } from "zod"
import { useEffect } from "react"
import './Checkout.css'
import { CartCheckOut } from "./CartCheckOut"

const genders = ["female", "male", "other"] as const

const schema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .regex(/^[A-Za-z]+$/, "El nombre no puede tener números"),

  lastName: z
    .string()
    .min(1, "El apellido es obligatorio")
    .regex(/^[A-Za-z]+$/, "El apellido no puede tener números"),

  phoneNumber: z.string()
    .min(1, "El número de teléfono es obligatorio")
    .max(11, "La cantidad máxima de dígitos es 11")
    .regex(/^\d+$/, "El teléfono solo debe tener números"),

  mail: z
    .email()
    .min(1, "El mail es obligatorio"),

  address: z
    .string()
    .min(1, "La dirección es obligatoria"),

  dni: z
    .string()
    .min(1, "El rut es obligatorio")
    .max(9, "El largo máximo del rut son 9 dígitos")
    .refine((value) => validate(value), {
      message: "El RUT no es válido",
    }),

  gender: z
    .string()
    .min(1, "El género es obligatorio"),

  region: z
    .string()
    .min(1, "La región es obligatoria"),

  ciudades: z
    .string()
    .min(1, "La ciudad es obligatoria"),


})

type FormData = z.infer<typeof schema>
export function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }

  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      region: ""
    }
  })

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)
  const selectedRegion = watch("region")


  const ciudadesFiltradas = communes.filter(c =>
    provinces.some(p =>
      p.id === c.provinceId && p.regionId === selectedRegion
    )
  )

  useEffect(() => {
    setValue("ciudades", "")
  }, [selectedRegion])
  return (
    <>
      <div className="main-container">
        <div className="checkout-container">
          <form onSubmit={handleSubmit(onSubmit)} className="checkout" >
            <div className="separateFields">
              <div className="fields">
                <label>Ingrese nombre:</label>
                <input  {...register("name",)} />
                {errors.name && <small className="error-message">{errors.name.message}</small>}
              </div>

              <div className="fields">
                <label>Ingrese apellido:</label>
                <input  {...register("lastName")} />
                {errors.lastName && <small className="error-message">{errors.lastName.message}</small>}
              </div>
            </div>

            <div className="separateFields">
              <div className="fields">
                <label>Ingrese rut:</label>
                <input  {...register("dni")} />
                {errors.dni && <small className="error-message">{errors.dni.message}</small>}
              </div>

              <div className="fields-select">
                <select {...register("gender")}>
                  <option value="">Seleccione un género</option>
                  {
                    genders.map(g => <option key={g} value={g}>{g}</option>)
                  }
                </select>
                {errors.gender && <small className="error-message">{errors.gender.message}</small>}
              </div>
            </div>

            <div className="separateFields">
              <div className="fields">
                <label>Ingrese número de teléfono:</label>
                <input  {...register("phoneNumber")} />
                {errors.phoneNumber && <small className="error-message">{errors.phoneNumber.message}</small>}
              </div>

              <div className="fields">
                <label>Ingrese correo electrónico:</label>
                <input  {...register("mail")} />
                {errors.mail && <small className="error-message">{errors.mail.message}</small>}
              </div>
            </div>

            <div className="separateFieldsSelect">
              <div className="fields-select">
                <select {...register("region")}>
                  <option value="">Ingrese su región</option>
                  {
                    regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)
                  }
                </select>
                {errors.region && <small className="error-message">{errors.region.message}</small>}
              </div>

              <div className="fields-select">
                <select {...register("ciudades")} disabled={!selectedRegion}>
                  <option value="">Selecciona una ciudad</option>
                  {
                    ciudadesFiltradas.map(ciu => <option key={ciu.id} value={ciu.id}>{ciu.name}</option>)
                  }
                </select>
                {errors.ciudades && <small className="error-message">{errors.ciudades.message}</small>}
              </div>
            </div>

            <div className="separateFields">
              <div className="fields">
                <label>Ingrese dirección:</label>
                <input  {...register("address")} />
                {errors.address && <small className="error-message">{errors.address.message}</small>}
              </div>

              <div className="fields">
                <label>Bloque/Apartamento:</label>
                <input  {...register("address")} />
              </div>
            </div>

            <div className="button-container">
              <button className="pay-button">Pagar</button>
            </div>
          </form>
        </div>
        <div className="cart-container">
          <CartCheckOut />
        </div>
      </div>
    </>
  )
}

