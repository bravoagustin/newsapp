import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

class News extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public author?: string;
  public image_url?: string;
  public created_at!: Date;
  public updated_at!: Date;
}

News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "News",
    tableName: "news",
    timestamps: false,
    underscored: true,  
  }
);

export default News;
