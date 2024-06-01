import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { cloudinary } from "../config/cloudinaryConfig.js"
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    locationData,
    locationType,
    mapData,
    photos,
    placeSpace,
    placeType,
    placeAmeneties,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);

  const uploadImage = async (image) => {
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'puqkrne3'
    })
    console.log(uploadedResponse)
    return {
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.secure_url
    }
  }

  const uploads = await Promise.all(photos.map(photo => uploadImage(photo)));

  console.log(uploads)

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        locationData,
        locationType,
        mapData,
        placeSpace,
        placeType,
        placeAmeneties,
        owner: { connect: { email: userEmail } },
        photos: {
          create: uploads
        }
      },
    });
    res.send({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === "P2002") {
      console.log(error)
    }
    throw new Error(error.message);
  }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
  const { guestCount, startDate, endDate, authorEmail, locationType } = req.body


  const { page = 1 } = req.query
  console.log(locationType)

  const limit = 10
  // Tính toán số lượng bản ghi bỏ qua
  const skip = (page - 1) * limit; // 'page' bắt đầu từ 1

  const query = {}

  if (authorEmail) {
    query.userEmail = authorEmail
  }

  if (startDate && endDate) {
    query.NOT = {
      Reservations: {
        some: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate },
              OR: [
                { Status: "Pending" },
                { Status: "Success" }
              ]
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
              OR: [
                { Status: "Pending" },
                { Status: "Success" }
              ]
            }
          ]
        }

      }
    }
  }



  try {
    const residencies = await prisma.residency.findMany({
      // orderBy là sắp xếp
      //  sắp xếp theo thời gian đăng giảm dần
      where: query,
      include: {
        Rating: true,
        photos: true
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit
    });

    let filteredResidencies = residencies
    filteredResidencies = filteredResidencies.filter(residency => {
      // Kiểm tra điều kiện về số lượng khách
      const isGuestCountValid = guestCount ? residency.placeSpace?.guetsts?.quantity === guestCount : true;

      // Kiểm tra điều kiện về loại địa điểm
      // Chỉ kiểm tra nếu locationType được cung cấp
      const isLocationTypeValid = locationType ? residency.locationType?.name === locationType : true;

      return isGuestCountValid && isLocationTypeValid;
    });
    res.send(filteredResidencies);
  } catch (error) {
    console.log(error)
  }


});

export const getAllResidencies_forMap = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Rating: true,
        photos: true
      },
    });
    console.log(residencies)
    res.send(residencies);
  } catch (error) {
    console.log(error)
  }
});

export const getAllResidencies_withAuthorEmail = asyncHandler(async (req, res) => {

  const { authorEmail } = req.body

  console.log(req.body)

  try {
    const residencies = await prisma.residency.findMany({
      // orderBy là sắp xếp
      //  sắp xếp theo thời gian đăng giảm dần
      where: { userEmail: authorEmail },
      select: {
        id: true,
        title: true,
        photos: true,
        userEmail: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.send(residencies);
  } catch (error) {
    console.log(error)
  }
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({
      where: { id: id },
      include: {
        owner: true,
        Rating: true,
        photos: true
      }
    });
    if (residency) {
      res.status(200).send(residency);
    } else {
      res.status(404).send({ error: 'Residency not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {

    // xóa các reservation của house này
    const reservation = await prisma.reservation.deleteMany({
      where: {
        ResidencyId: id
      }
    })

    // cập nhật nhà yêu thích của User
    const favResidenciesID = await prisma.favResidenciesID.deleteMany({
      where: { ResidencyId: id },
    });

    // xóa ảnh của nhà này
    const { photos } = await prisma.residency.findFirst({
      where: {
        id: id
      },
      include: {
        photos: true
      }
    })

    if (photos && photos.length) {
      await Promise.all(photos.map((photo) => {
        return cloudinary.uploader.destroy(photo.public_id)
          .catch(err => {
            console.error('Error deleting photo:', err);
            // Xử lý hoặc ghi lại lỗi ở đây
          });
      }));
    }

    await prisma.photos.deleteMany({
      where: {
        ResidencyId: id
      },

    })

    const residency = await prisma.residency.delete({
      where: { id: id }
    })

    if (residency) {
      res.status(200).send(residency);
    } else {
      res.status(404).send({ error: 'Residency not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
})

export const deleteImageRes = asyncHandler(async (req, res) => {
  const { residencyId } = req.params
  const { idImage } = req.body

  console.log(residencyId, idImage)
  try {
    const { photos } = await prisma.residency.findFirst({
      where: {
        id: residencyId
      },
      include: {
        photos: true
      }
    })

    if (photos.length <= 5) {
      return res.status(400).send({ error: 'Cannot delete image. There must be at least 5 photos.' });
    }

    // kiểm tra xem trong obj có obj nào trong mảng có thuộc tính id === idImage
    if (photos.some((photo) => photo.public_id === idImage)) {
      await cloudinary.uploader.destroy(idImage)
        .catch(err => {
          console.error('Error deleting photo:', err);
        })
    }


    const residency = await prisma.residency.update({
      where: {
        id: residencyId
      },
      data: {
        photos: {
          deleteMany: {
            public_id: idImage
          }
        }
      }
    })
    if (residency) {
      res.status(200).send(residency);
    } else {
      res.status(404).send({ error: 'Residency not found' });
    }
  } catch (error) {
    throw new Error(error.message)
  }
})

export const updateImage = asyncHandler(async (req, res) => {
  const { residencyId } = req.params;
  const { photo } = req.body;

  console.log(photo)
  try {
    // Tìm kiếm residency
    const residency = await prisma.residency.findUnique({
      where: {
        id: residencyId
      },
      include: {
        photos: true
      }
    });

    if (!residency) {
      return res.status(404).send({ error: 'Residency not found' });
    }

    // Hàm tải ảnh lên Cloudinary
    const uploadImage = async (image) => {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(image, {
          upload_preset: 'puqkrne3'
        });
        console.log(uploadedResponse);
        return {
          public_id: uploadedResponse.public_id,
          url: uploadedResponse.secure_url
        };
      } catch (uploadError) {
        throw new Error(`Error uploading image: ${uploadError.message}`);
      }
    };

    // Thực hiện tải ảnh
    const upload = await uploadImage(photo);
    const updatedPhotos = [...residency.photos, upload];

    console.log(residency.photos) //

    // Cập nhật residency
    const updatedResidency = await prisma.residency.update({
      where: {
        id: residencyId
      },
      data: {
        photos: {
          create: upload
        }
      }
    });

    res.status(200).send(updatedPhotos);

  } catch (error) {
    // Xử lý các loại lỗi khác nhau
    console.log(error)
    if (error.message.startsWith('Error uploading image:')) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

export const updateResidency = asyncHandler(async (req, res) => {
  const { id } = req.params
  const data = req.body

  console.log(data)

  try {
    const residency = await prisma.residency.update({
      where: {
        id: id
      },
      data: data
    })
    if (residency) {
      res.status(200).send(residency);
    } else {
      res.status(404).send({ error: 'Residency not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
})

