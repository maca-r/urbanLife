package com.urbanlife.urbanlife.services;

import com.urbanlife.urbanlife.repository.ReservaRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservaService {
    @Autowired
    ReservaRepository reservaRepository;
    private static final Logger logger = Logger.getLogger(ReservaService.class);

}
