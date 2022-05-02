import { Api, Get, Post, Delete, Params, Query, useContext } from '@midwayjs/hooks'
import type { Context } from '@midwayjs/koa'
import { useEntityModel } from '@midwayjs/orm'
import { Like, FindOptionsWhere, Between } from 'typeorm'
import Glasses from '@src/api/models/Glasses'
import { Glasses as GlassesEntity } from './entity/glasses'

export const createOrSaveGlasses = Api(
    Post('/glasses'),
    async (glasses: Glasses) => {
        if (glasses.id) {
            const glassesEntity = await useEntityModel(GlassesEntity)
                .findOne({ where: { id: glasses.id } })
            if (!glassesEntity) return null
            glassesEntity.orderAt = glasses.orderAt
            glassesEntity.name = glasses.name.trim()
            glassesEntity.orderID = glasses.orderID.trim()
            glassesEntity.phone = glasses.phone.trim()
            glassesEntity.indexOfRefraction = glasses.indexOfRefraction
            glassesEntity.brand = (glasses.brand || '').trim()
            glassesEntity.factor = glasses.factor
            glassesEntity.axis = glasses.axis
            glassesEntity.glass = glasses.glass
            glassesEntity.comment = (glasses.comment || '').trim()
            const res = await useEntityModel(GlassesEntity).save(glassesEntity)
            return res
        } else {
            const newGlasses = new GlassesEntity() 
            newGlasses.orderAt = glasses.orderAt
            newGlasses.name = glasses.name.trim()
            newGlasses.orderID = glasses.orderID.trim()
            newGlasses.phone = glasses.phone.trim()
            newGlasses.indexOfRefraction = glasses.indexOfRefraction
            newGlasses.brand = (glasses.brand || '').trim()
            newGlasses.factor = glasses.factor
            newGlasses.axis = glasses.axis
            newGlasses.glass = glasses.glass
            newGlasses.comment = (glasses.comment || '').trim()
            const res = await useEntityModel(GlassesEntity).save(newGlasses)
            return res
        }
    }
)

export const deleteGlasses = Api(
    Delete('/glasses/:id'),
    Params<{ id: string }>(),
    async () => {
        const ctx = useContext()
        const id = ctx.params.id
        if (!id) return false
        const glassesToRemove = await useEntityModel(GlassesEntity).findOne({
            where: { id }
        })
        if (!glassesToRemove) return false
        await useEntityModel(GlassesEntity).remove(glassesToRemove)
        return true
    }
)

export const getGlassesList = Api(
    Get('/glasses'),
    Query<{ page: string; size: string }>(),
    async () => {
        const ctx = useContext<Context>()
        const { page, size } = ctx.query
        const p = parseInt(page as string, 10)
        const s = parseInt(size as string, 10)
        const records = await useEntityModel(GlassesEntity)
            .createQueryBuilder('glasses')
            .take(s)
            .skip((p - 1) * s)
            .getManyAndCount()
        
        return {
            data: records[0],
            total: records[1]
        } 
    }
)

export const searchGlasses = Api(
    Get('/glasses/search'),
    Query<{
        page: string;
        size: string;
        name: string;
        phone: string;
        orderID: string;
        startAt: string;
        endAt: string;
    }>(),
    async () => {
        const ctx = useContext<Context>()
        const { page, size, name, phone, orderID, endAt, startAt } = ctx.query
        const p = parseInt(page as string, 10)
        const s = parseInt(size as string, 10)
        const whereCondition = <FindOptionsWhere<GlassesEntity>>{};
        if (name) {
            whereCondition.name = Like(`%${name}%`)
        }
        if (phone) {
            whereCondition.phone = Like(`%${phone}%`)
        }
        if (orderID) {
            whereCondition.orderID = Like(`%${orderID}%`)
        }
        if (startAt && endAt) {
            whereCondition.orderAt = Between((Number(startAt)), Number(endAt))
        }
        const records = await useEntityModel(GlassesEntity)
        	.findAndCount({
                where: whereCondition,
                take: s,
                skip: (p - 1) * s
            })
        
        return {
            data: records[0],
            total: records[1]
        } 
    }
)
