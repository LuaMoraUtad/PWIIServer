const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true; //TODO crear patrón
                },
                message: "ERROR_URL",
            }
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId //Estructura (string) especial de mongo
        }
    },
    {
        timestamp: true, //TODO createdAt, updatedAt
        versionKey: false
    }
)

TracksScheme.statics.findOneData = function(name) {
    const joinData = this.aggregate([
        {
            $match: {
                _id:mongooseTypes.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "storages",
                localField: "mediaId", // tracks.mediaId
                foreignField: "_id", // storages._id
                as: "audio" // Alias audio
            }
        },
        /* {
            $unwind:"$audio"
        }, */
    ]);
    
    return joinData;
}

TracksScheme.statics.findAllData = function(name) {
    // "this." hace referencia a su propio modelo
    const joinData = this.aggregate([
        {
            $lookup: { // lookup =~ left join
                from: "storages",
                localField: "mediaId", // tracks.mediaId
                foreignField: "_id", // storages._id
                as: "audio" // Alias audio
            }
        },
        /* { // From LEFT JOIN to INNER JOIN
            $unwind("$audio")
        } */
    ]);

    return joinData;
}

TracksScheme.plugin(mongooseDelete, {overrideMethods: "all"});

module.exports = mongoose.model("tracks", TracksScheme); //Nombre de la colección (o de la tabla en SQL)
