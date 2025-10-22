import { fastifySwagger } from '@fastify/swagger'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCourseRoute } from './src/routes/create-course.ts'
import { getCourseByIdRoute } from './src/routes/get-courses-by-id.ts'
import { getCoursesRoute } from './src/routes/get-courses.ts'
import scalaAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            }
        }
    }
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'API Node.js',
                version: '1.0.0',
            }
        },
        transform: jsonSchemaTransform
    })

    server.register(scalaAPIReference, {
        routePrefix: '/docs'
    })
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)

server.listen({ port: 2222 }).then(() => {
    console.log("Servidor rodando")
})