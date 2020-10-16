import { gql } from 'apollo-server'
import config from '../../../config'

const schemas = gql`
	extend type Mutation {
		saveForm(nombre: String, email: String, descripcion: String, telefono: String, form: Data): Resp
	}

  enum Tipo {
    WEB
    MOBILE
    REDES
    TV
  } 

  enum Categorias {
    ECOMMERCE
    LANDING
    SIMPLE
    ADMINISTRABLE
    OTROS
  }

  enum Pantallas {
    DE1A4
    DE4A10
    DE10A15 
    DE15MAS
  }

  enum Plataforma {
    ANDROID
    IOS
    AMBOS
  }

	input Data {
		tipo: Tipo 
		disenio: Boolean 
		categoria: Categorias
		login: Boolean 
		compras: Boolean 
		administrador: Boolean 
		pantallas: Pantallas
		plataforma: Plataforma 
		perfil: Boolean 
		lector: Boolean 
		bluetooth: Boolean 
	}

	type Resp {
		description: String
	}
`

const resolvers = {
	Mutation: {
		saveForm: (_, args, { dataSources }) => {
			return dataSources.form.save(args)
		},
	}
}

export { schemas, resolvers }
